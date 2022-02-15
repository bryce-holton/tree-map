import { map, filter, prop, head, groupBy, pluck, slice, keys, toLower, identity, includes } from 'ramda';

export const processSearch = (searchQuery, records) => {
    const searchFn = includes(toLower(searchQuery));
    const searchResults = map(rec => {
    // "Common Name", "Taxon Name", "Accession"
    const id = prop('id')(rec);
    const fields = prop('fields')(rec);
    const commonName = head(prop('Common Name')(fields));
    const commonNameMatch = searchFn(toLower(commonName));
    if (commonNameMatch) {
        return {
        id,
        label: commonName,
        }
    }
    const taxonName = prop('Taxon Name')(fields);
    const taxonNameMatch = searchFn(toLower(taxonName));
    if (taxonNameMatch) {
        return {
        id,
        label: taxonName,
        }
    }
    const accession = prop('Accession')(fields);
    const accessionMatch = searchFn(toLower(accession));
    if (accessionMatch) {
        return {
        id,
        label: accession,
        }
    }

    return null;
    }, records);
    const filteredSearchResults = filter(identity, searchResults);
    const groupedResults = groupBy(prop('label'), filteredSearchResults);
    const formattedResults = map(pluck('id'), groupedResults);
    const resultKeys = keys(formattedResults);
    const slicedKeys = slice(0, 10, resultKeys);
    
    return {
        formattedResults,
        slicedKeys,
    }
}