import { 
  map, path, lensPath, set, has, composeP, ifElse, compose, identity
} from 'ramda';
import { pickIdAndFieldsMap, getData } from './common';

const ACCESSION_PARAMS = {
  view: 'Current Items',
  fields: [
    'Accession', 
    'Taxon Name', 
    'Genus', 
    'Species', 
    'Infraspecific Type 1', 
    'Infraspecific Name 1', 
    'Cultivar', 
    'Common Name', 
    'Origin', 
    'Family', 
    'Latitude', 
    'Longitude', 
    'Photo 1 URL',
  ],
};

/**
 * @private
 * @returns {Lens} See Ramda docs
 */
const photoLensPath = lensPath(['fields', 'Photo 1 URL']);

/**
 * @private
 * @returns {function(Object): Object}
 */
const handlePhotoURLError = ifElse(
  compose(has('error'), path(['fields', 'Photo 1 URL'])), 
  set(photoLensPath, null), 
  identity
);

/**
 * @public
 * @async
 * @returns {function(function): Object[]}
 */
export const cleanAccessionRecords = composeP(
  map(handlePhotoURLError),
  pickIdAndFieldsMap,
  getData('Accession Items', ACCESSION_PARAMS)
);
