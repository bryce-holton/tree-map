import { 
    map, groupBy, prop, head, set, composeP, lensPath,
    compose, identity, flip, converge, append, path
} from 'ramda';
import { pickIdAndFieldsMap, getData } from './common';

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
const genusLensPath = lensPath(['fields', 'Genus']);

/**
 * @public
 * @async
 * @returns {function(function): function}
 */
 export const setGenusName = composeP(
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