import Airtable from 'airtable';
import { 
    composeP, compose, converge, call, unapply, apply 
} from 'ramda';
import { cleanAccessionRecords } from './accession';
import { setGenusName } from './genus';

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

