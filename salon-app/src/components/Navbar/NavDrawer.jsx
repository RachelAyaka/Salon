import { Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom"
import { getInitials } from "../../utils/helper";

const NavDrawer = ({mobileOpen, handleDrawerToggle, userInfo, location, onLogout}) => {
  const theme = useTheme()
  return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better mobile performance
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            borderRadius: '0 0 16px 0'
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Aya's Lash
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="close drawer" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/'
            sx={{
              textAlign: 'center',
              color: 'inherit',
              fontWeight: location.pathname === '/'  ? 'bold' : 'normal',
            }}
          >
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to='/policy'
            sx={{
              textAlign: 'center',
              color: 'inherit',
              fontWeight: location.pathname === '/policy'  ? 'bold' : 'normal',
            }}
          >
            <ListItemText primary={'Policy'} />
          </ListItemButton>
        </ListItem>
        {userInfo ? (
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to='/appointment'
                sx={{
                  textAlign: 'center',
                  color: 'inherit',
                  fontWeight: location.pathname === '/appointment'  ? 'bold' : 'normal',
                }}
              >
                <ListItemText primary={'My Appointments'} />
              </ListItemButton>
             </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout} sx={{ textAlign: 'center', color: theme.palette.error.main }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/signup" sx={{ textAlign: 'center', color: theme.palette.secondary.main }}>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {userInfo && (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <Avatar sx={{ mb: 1, bgcolor: theme.palette.primary.main }}>
            {getInitials(userInfo.fullName)}
          </Avatar>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {userInfo.name || userInfo.email}
          </Typography>
        </Box>
      )}
    </Box>
    </Drawer>
  )
}

export default NavDrawer