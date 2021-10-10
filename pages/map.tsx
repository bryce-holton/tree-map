import dynamic from 'next/dynamic';
import type { NextPage, GetStaticProps } from 'next';
import Airtable from 'airtable';
import { pick, map } from 'ramda';

const MapComponent = dynamic(
  () => import('../components/map'),
  { ssr: false }
);

const MapPage: NextPage = (props) => <MapComponent records={[]} {...props}/>;

export const getStaticProps: GetStaticProps = async() => {
  const baseId: string = process.env.AIRTABLE_BASE_ID!;
  const base = Airtable.base(baseId);
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
