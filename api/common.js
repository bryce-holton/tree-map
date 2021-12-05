import { pick, map, curry } from 'ramda';

/**
 * @public
 * @returns {function(Object[]): Object[]}
 */
 export const pickIdAndFieldsMap = map(pick(['id', 'fields']));

/**
 * @public
 * @async
 * @param {string} tableName
 * @param {Object} selectObj
 * @param {function(string): Object} base
 * @returns {Promise}
 */
 export const getData = curry( 
    (tableName, selectObj, base) => base(tableName).select(selectObj).all() 
);