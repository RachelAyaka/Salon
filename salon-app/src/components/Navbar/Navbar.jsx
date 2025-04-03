import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
} from '@mui/material'
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material'
import ProfileInfo from '../Cards/ProfileInfo' // Assuming this component is modified accordingly
import { styled } from '@mui/system'

const Navbar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleSearch = () => {
    // Implement your search functionality here
  }

  const onClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left Section: Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            maxWidth: '400px',
            borderRadius: '50px',
            overflow: 'hidden',
            border: '1px solid #ddd',
          }}
        >
          <InputBase
            sx={{
              pl: 2,
              pr: 2,
              py: 1,
              fontSize: '16px',
              flex: 1,
              color: '#333',
              '& .MuiInputBase-input': {
                borderRadius: '50px',
                backgroundColor: '#f9f9f9',
              },
            }}
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            placeholder="Search Notes"
            startAdornment={<SearchIcon sx={{ color: '#999' }} />}
          />
          {searchQuery && (
            <IconButton
              sx={{ padding: '8px', color: '#999' }}
              onClick={onClearSearch}
            >
              <SearchIcon
                sx={{ transform: 'rotate(180deg)', fontSize: '18px' }}
              />
            </IconButton>
          )}
        </Box>

        {/* Right Section: Profile and Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
