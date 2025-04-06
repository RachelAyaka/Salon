import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  Card,
  CardContent,
  Fade,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PaidIcon from '@mui/icons-material/Paid'
import axiosInstance from '../../utils/axiosInstance'
import AddEditService from './AddEditService'
import { formatDuration } from '../../utils/helper'

const Booking = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedServices, setSelectedServices] = useState([])

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const handleEdit = (serviceDetails) => {
    setOpenAddEditModal({ isShown: true, data: serviceDetails, type: 'edit' })
  }

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
      navigate('/login')
    }
  }

  // Fetch services from the backend
  const getAllServices = async () => {
    try {
      const response = await axiosInstance.get('/get-services')
      if (response.data && response.data.services) {
        setServices(response.data.services)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllServices()
    return () => {}
  }, [])

  const handleServiceChange = (event, serviceId, service) => {
    if (event.target.checked) {
      setSelectedServices((prevSelected) => [...prevSelected, service])
    } else {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((service) => service._id !== serviceId),
      )
    }
  }

  const handleContinueClick = () => {
    navigate('/booking/schedule', {
      state: { selectedServices },
    })
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" align="center" mt={2} color="text.secondary">
          Loading services...
        </Typography>
      </Container>
    )
  }

  const handleOpenModal = (type, data = null) => {
    setOpenAddEditModal({ isShown: true, type, data })
  }

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: 'add', data: null })
  }

  const isAdmin = userInfo && userInfo.email === 'rachellin117@gmail.com'

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box 
        sx={{ 
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%,  #fdfcfb 100%)`,
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          mb: 4,
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Our Services
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="left">
        {services.map((service) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service._id}>
              {/* size={{ xs: 12, sm: 6, md: 4 }}
               key={service._id}
              sx={{ display: 'flex' }} */}

            <Card 
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
            }}}>
              {isAdmin && (
                <IconButton
                  onClick={() => handleEdit(service)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: theme.palette.secondary.main,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    width: 36,
                    height: 36,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServices.some(s => s._id === service._id)}
                        onChange={(e) => handleServiceChange(e, service._id, service)}
                        color="primary"
                        name="serviceCheckbox"
                        id={`checkbox-${service._id}`}
                      />
                    }
                    label={
                      <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        {service.serviceName}
                      </Typography>
                    }
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaidIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 18 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      ${service.price}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ color: theme.palette.info.main, mr: 1, fontSize: 18 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDuration(service.duration)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box 
        sx={{ 
          position: 'sticky', 
          bottom: 0, 
          left: 0, 
          right: 0,
          bgcolor: 'background.paper',
          pt: 2,
          pb: 3,
          mt: 4,
          boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
          borderRadius: '16px 16px 0 0',
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          {selectedServices.length > 0 && (
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedServices.map(service => (
                <Chip 
                  key={service._id}
                  label={service.serviceName}
                  onDelete={() => handleServiceChange({target: {checked: false}}, service._id, service)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>  
          )}
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleContinueClick}
            disabled={selectedServices.length === 0}
            sx={{ 
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              boxShadow: 4
            }}
          >
            {selectedServices.length > 0 ? 'Continue to Scheduling' : 'Please Select a Service'}
          </Button>
        </Container>
      </Box>

      {isAdmin && (
        <>
          <Fade in={true}>
            <Button
              sx={{
                position: 'fixed',
                right: 20,
                bottom: 80,
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: theme.palette.secondary.main,
                '&:hover': { backgroundColor: theme.palette.secondary.dark },
                boxShadow: 4,
              }}
              onClick={() => handleOpenModal('add')}
            >
              <AddIcon style={{ fontSize: '32px', color: 'white' }} />
            </Button>
          </Fade>
          
          <Modal
            open={openAddEditModal.isShown}
            onClose={handleCloseModal}
            aria-labelledby="add-edit-modal"
            aria-describedby="add-edit-service"
            sx={{
              backdropFilter: 'blur(5px)',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 3,
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                margin: '20px auto',
                padding: 3,
                overflowY: 'auto',
                boxShadow: 24,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <AddEditService
                type={openAddEditModal.type}
                serviceData={openAddEditModal.data}
                onClose={() => {
                  setOpenAddEditModal({
                    isShown: false,
                    type: 'add',
                    data: null,
                  })
                }}
                getAllServices={getAllServices}
              />
            </Box>
          </Modal>
        </>
      )}
    </Container>
  )
}

export default Booking