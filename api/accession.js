import Airtable from 'airtable';
import { 
  pick, map, groupBy, prop, head, path, lensPath, set, has, composeP, ifElse,
  compose, identity, flip, converge, append, curry, call, unapply, apply 
} from 'ramda';

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
const GENUS_PARAMS = { fields: ['Genus'] };

/**
 * @private
 * @returns {function(Object): String }
 */
const genusPath = path(['fields', 'Genus']);

/**
 * @private
 * @returns {Lens} See Ramda docs
 */
const photoLensPath = lensPath(['fields', 'Photo 1 URL']);

/**
 * @private
 * @returns {Lens} See Ramda docs
 */
const genusLensPath = lensPath(['fields', 'Genus']);

/**
 * @private
 * @returns {function(Object[]): Object[]}
 */
const pickIdAndFieldsMap = map(pick(['id', 'fields']));

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
 * @private
 * @async
 * @param {string} tableName
 * @param {Object} selectObj
 * @param {function(string): Object} base
 * @returns {Promise}
 */
const getData = curry( 
  (tableName, selectObj, base) => base(tableName).select(selectObj).all() 
);

/**
 * @private
 * @async
 * @returns {function(function): function}
 */
const setGenusName = composeP(
  map,
  converge(set(genusLensPath)),
  append(identity),
  flip(append)([]),
  fn => compose(fn, genusPath),
  flip(prop),
  map(genusPath),
  map(head),
  groupBy(prop('id')),
  pickIdAndFieldsMap,
  getData('Genus & Family', GENUS_PARAMS)
);

/**
 * @private
 * @async
 * @returns {function(function): Object[]}
 */
const cleanAccessionRecords = composeP(
  map(handlePhotoURLError),
  pickIdAndFieldsMap,
  getData('Accession Items', ACCESSION_PARAMS)
);

/**
 * @private
 * @async
 * @returns {function(function): Object[]}
 */
const getAndMergeRecords = converge(
  composeP(apply(call), unapply( pArr => Promise.all(pArr) )),
  [setGenusName, cleanAccessionRecords]
);

/**
 * @public
 * @async
 * @returns {function(string): Object[]}
 */
export const getRecords = compose(
  getAndMergeRecords,
  Airtable.base
);
