import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Airtable from 'airtable';
import { pick, map } from 'ramda';

const MapComponent = dynamic(
  () => import('../components/map'),
  { ssr: false }
);

const MapPage: NextPage = (props) => <MapComponent {...props}/>;

export const getStaticProps = async() => {
  const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
  const queryRes = await base('Accession Items').select({
    view: 'Current Items',
    fields: ['Species', 'Photo 1 URL', 'Latitude', 'Longitude'],
  }).all();
  const records = map(pick(['id', 'fields']), queryRes);

  return {
    props: { records }
  }
}

export default MapPage;
