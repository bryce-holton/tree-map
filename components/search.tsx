import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Record } from '../shared/types';
import { processSearch } from '../shared/search';
import MCCLogo from '../public/mcc-logo.png';
import Image from 'next/image';

interface SearchType {
  records: Record[];
  setSearchResults: Function;
}

export const Search = ({
  records,
  setSearchResults,
}: SearchType) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { slicedKeys, formattedResults } = processSearch(
    searchQuery,
    records
  );

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        position: 'absolute',
        zIndex: '1000',
        left: '60px',
        marginTop: '.5rem',
        background: 'white',
        paddingTop: '.5rem',
      }}
      noValidate
      autoComplete='off'>
      <Image
        src={MCCLogo}
        alt='MCC logo'
        width={250}
        height={49}
      />
      <Autocomplete
        options={slicedKeys}
        onChange={(e, v) =>
          setSearchResults(v ? formattedResults[v] : [])
        }
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label='Search'
          />
        )}
      />
    </Box>
  );
};
