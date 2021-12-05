import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { filter, prop, startsWith, head } from 'ramda';
import { Record } from '../shared/types';

export const Search = ({ records }: { records: Record[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchFn = startsWith(searchQuery);
  const searchResults = filter(rec => {
    // "Common Name", "Taxon Name", "Accession"
    const fields = prop('fields')(rec);
    const commonName = head(prop('Common Name')(fields));
    const commonNameMatch = searchFn(commonName);
    const taxonName = head(prop('Taxon Name')(fields));
    const taxonNameMatch = searchFn(taxonName);
    const accessionName = prop('Accession')(fields);
    const accessionMatch = searchFn(accessionName);

    return commonNameMatch || taxonNameMatch || accessionMatch;
  }, records);

  // console.log(searchResults);
  return (
    <Box
      component="form"
      sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="Search" 
        variant="outlined" 
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
      />
    </Box>
  );
}