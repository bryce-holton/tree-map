import dynamic from 'next/dynamic';
import type { NextPage, GetStaticProps } from 'next';
import { getRecords } from '../airtable/accession';

const MapComponent = dynamic(
  () => import('../components/map'),
  { ssr: false }
);

const MapPage: NextPage = (props) => <MapComponent records={[]} {...props}/>;

// In "fields:"" specify the Airtable fields to pull data from (same as list in components/map.tsx)
export const getStaticProps: GetStaticProps = async() => {
  const records = await getRecords(process.env.AIRTABLE_BASE_ID!);

  return {
    props: { records }
  }
}

export default MapPage;
