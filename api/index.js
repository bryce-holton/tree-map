import Airtable from 'airtable';
import { 
    composeP, compose, converge, map, unapply, prop, groupBy, head, lensPath, over, flip, trim 
} from 'ramda';
import { cleanAccessionRecords } from './accession';
import { setGenusName } from './genus';
import { getTaxa } from './taxa';

const processRecords = ([genusFn, accessionRecs, taxaRecs]) => {
  const accessionWithGenus = genusFn(accessionRecs);
  const taxaWithGenus = genusFn(taxaRecs);
  const taxaBuiltGenus = map((taxa) => {
    const {id, fields} = taxa;
    let genus = fields.Genus + ' ' + fields.Species + ' ';
    genus += fields['Infraspecific Type 1'] ? fields['Infraspecific Type 1'] + ' ' : '';
    genus += fields['Infraspecific Name 1'] ? fields['Infraspecific Name 1'] + ' ' : '';
    genus += fields.Cultivar ? fields.Cultivar : '';
    return {
      id,
      genus,
    }
  }, taxaWithGenus);
  const groupedTaxa = groupBy(prop('id'), taxaBuiltGenus);
  const finalTaxa = map(compose(trim, prop('genus'), head), groupedTaxa);
  const findTaxaFn = flip(prop)(finalTaxa);
  const accessionWithGenusAndTaxa = map(over(lensPath(['fields', 'Taxon Name']), compose(findTaxaFn, head)), accessionWithGenus);

  return accessionWithGenusAndTaxa;
}

/**
 * @private
 * @async
 * @returns {function(function): Object[]}
 */
 const getAllRecords = converge(
  composeP(processRecords, unapply( pArr => Promise.all(pArr) )),
  [setGenusName, cleanAccessionRecords, getTaxa]
);
  
/**
 * @public
 * @async
 * @returns {function(string): Object[]}
 */
export const getRecords = compose(
  getAllRecords,
  Airtable.base
);

