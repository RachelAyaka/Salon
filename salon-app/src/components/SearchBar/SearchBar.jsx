import React from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div style={{ width: '320px' }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={onClearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default SearchBar
