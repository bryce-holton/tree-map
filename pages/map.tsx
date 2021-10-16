import dynamic from 'next/dynamic';
import type { NextPage, GetStaticProps } from 'next';
import Airtable from 'airtable';
import { pick, map, groupBy, prop, head, path, lensPath, set } from 'ramda';

const MapComponent = dynamic(
  () => import('../components/map'),
  { ssr: false }
);

const MapPage: NextPage = (props) => <MapComponent records={[]} {...props}/>;

// In "fields:"" specify the Airtable fields to pull data from (same as list in components/map.tsx)
export const getStaticProps: GetStaticProps = async() => {
  const baseId: string = process.env.AIRTABLE_BASE_ID!;
  const base = Airtable.base(baseId);
  const accessionQuery = await base('Accession Items').select({
    view: 'Current Items',
    fields: ['Accession', 'Taxon Name', 'Genus', 'Species', 'Infraspecific Type 1', 'Infraspecific Name 1', 'Cultivar', 'Common Name', 'Origin', 'Family', 'Latitude', 'Longitude', 'Photo 1 URL'],
  }).all();
  const accessionRecords = map(pick(['id', 'fields']), accessionQuery);
  const genusQuery = await base('Genus & Family').select({ fields: ['Genus'] }).all();
  const genusRecords = map(pick(['id', 'fields']), genusQuery);
  const genusGroupedById = groupBy(prop('id'), genusRecords);
  const genusByIdClean = map(head, genusGroupedById);
  const finalGenusRecords = map(path(['fields', 'Genus']), genusByIdClean);
  const genusPath = lensPath(['fields', 'Genus']);
  const mergedRecords = map((accessionRecord) => set(genusPath, finalGenusRecords[accessionRecord.fields.Genus], accessionRecord), accessionRecords);

  return {
    props: { records: mergedRecords }
  }
}

export default MapPage;
