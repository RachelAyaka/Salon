import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ProfileInfo from '../Cards/ProfileInfo'
import axiosInstance from '../../utils/axiosInstance'
import NavDrawer from './NavDrawer'

const Navbar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [url, setUrl] = useState('')
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear()
      }
    }
  }

  const onLogout = () => {
    localStorage.clear()
    setUserInfo(null)
    navigate('/')
    setMobileOpen(false)
  }

  const getTrailingUrl = () => {
    setUrl(location.pathname.split('/').pop())
    return
  };

  useEffect(() => {
    getUserInfo()
    setMobileOpen(false)
    getTrailingUrl()
    return () => {}
  }, [location.pathname])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'primary',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography variant="h4" component='div' sx={{ flexGrow: 1 }} style={{ fontFamily: 'Alex Brush, cursive' }}>
          Aya's Lash
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Button component={Link} to="/" color='inherit' 
          sx={{
            padding: '8px 8px', 
            marginRight:2, 
            backgroundColor: theme.palette.background.default,
            ":hover": {
              backgroundColor: theme.palette.primary.dark, 
              boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)', 
            } 
          }}
        >
          Home
        </Button>
        <Button component={Link} to="/policy" color='inherit' sx={{
            padding: '8px 8px', 
            marginRight:2, 
            backgroundColor: theme.palette.background.default,
            ":hover": {
              backgroundColor: theme.palette.primary.dark, 
              boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)', 
            } 
          }}
        >
          Policy
        </Button>
            
            {userInfo ? (
              <>
                <Button component={Link} to="/appointment" color="inherit" sx={{
            padding: '8px 8px', 
            marginRight:2, 
            backgroundColor: theme.palette.background.default,
            ":hover": {
              backgroundColor: theme.palette.primary.dark, 
              boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)', 
            }}}>
                  My Appointments
                </Button>
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="contained" 
                  color="secondary"
                  sx={{ ml: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                color="secondary"
                  sx={{ ml: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
          <MenuIcon />
        </IconButton>
          
      </Toolbar>
      </Container>
      <NavDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} userInfo={userInfo} location={location} onLogout={onLogout}/>
    </AppBar>
  )
}

export default Navbar