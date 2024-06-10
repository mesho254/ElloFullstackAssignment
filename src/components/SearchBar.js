import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange }) => (
  <TextField
    label="Search"
    variant="outlined"
    value={value}
    onChange={onChange}
    fullWidth
  />
);

export default SearchBar;
