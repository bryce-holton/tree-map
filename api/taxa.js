import { composeP } from 'ramda';
import { pickIdAndFieldsMap, getData } from './common';

const TAXA_PARAMS = { fields: ['Genus', 'Species', 'Infraspecific Type 1', 'Infraspecific Name 1', 'Cultivar'] };

export const getTaxa = composeP(
  pickIdAndFieldsMap,
  getData('Taxa', TAXA_PARAMS)
);