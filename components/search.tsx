import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface SearchProps {
  searchQuery: String;
  setSearchQuery: Function;
};

export const Search = ({searchQuery, setSearchQuery}: SearchProps) => {
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