import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Record } from '../shared/types';
import { processSearch } from '../shared/search';

interface SearchType {
  records: Record[];
  setSearchResults: Function;
}

export const Search = ({ records, setSearchResults }: SearchType) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {slicedKeys, formattedResults } = processSearch(searchQuery, records);

  return (
    <Box
      component="form"
      sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        options={slicedKeys}
        onChange={(e, v) => setSearchResults(v ? formattedResults[v] : [])}
        renderInput={params => <TextField 
          {...params} 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          label="Search" 
        />}
      />
    </Box>
  );
}