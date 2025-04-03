import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import Navbar from '../../components/Navbar/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import AddEditService from './AddEditService'

const Booking = () => {
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
      if (Error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
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

  const handleServiceChange = (event, serviceId) => {
    if (event.target.checked) {
      setSelectedServices((prevSelected) => [...prevSelected, serviceId])
    } else {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((id) => id !== serviceId),
      )
    }
  }

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" align="center" gutterBottom>
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
    <>
      <Navbar userInfo={userInfo} />
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Welcome to Our Salon
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Choose a Service:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {services.map((service) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={service._id}
              sx={{ display: 'flex' }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1, 
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  {/* Checkbox and Service Name on the left */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServices.includes(service._id)}
                        onChange={(e) => handleServiceChange(e, service._id)}
                        color="primary"
                        name="serviceCheckbox"
                        id={`checkbox-${service._id}`}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        {service.serviceName}
                      </Typography>
                    } 
                    sx={{ marginRight: 2 }} 
                  />
                </Box>

                {isAdmin ? (
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      onClick={() => handleEdit(service)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'pink',
                      }}
                    >
                      <EditIcon style={{ fontSize: '20px' }} />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
                <Typography variant="body1">${service.price}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Link to={{ pathname: '/booking', state: { selectedServices } }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={selectedServices.length === 0}
          >
            Continue
          </Button>
        </Link>

        {isAdmin ? (
          <>
            <Button
              sx={{
                position: 'fixed',
                right: 20,
                bottom: 20,
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
                boxShadow: 3,
              }}
              onClick={() => handleOpenModal('add')}
            >
              <AddIcon style={{ fontSize: '32px', color: 'white' }} />
            </Button>
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
                  borderRadius: 2,
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
        ) : null}
      </Container>
    </>
  )
}

export default Booking
