import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import axiosInstance from '../../../utils/axiosInstance'
import TimeSlotSelector from './TimeSlotSelector'
import Calendar from './Calendar'

const Schedule = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedServices: initialServices } = location.state || {
    selectedServices: [],
  }
  const [selectedServices, setSelectedServices] = useState(initialServices)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [note, setNote] = useState("")

  useEffect(() => {
    if (selectedServices.length === 0) {
      navigate('/booking')
    }
  }, [selectedServices, navigate])

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0 && mins > 0) {
      return `${hours}hr ${mins}min`
    } else if (hours > 0) {
      return `${hours}hr`
    } else {
      return `${mins}min`
    }
  }

  // Get available slots for the selected date
  useEffect(() => {
    let accumulatedDuration = 0
    let accumulatedPrice = 0

    // Loop through selected services to calculate total duration and price
    selectedServices.forEach((service) => {
      accumulatedDuration += service.duration
      accumulatedPrice += service.price
    })

    // Update the state once with the calculated totals
    setTotalDuration(accumulatedDuration)
    setTotalPrice(accumulatedPrice)
    setLoading(true)

    //makes sure date is in PST
    const options = {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
    const formattedDate = selectedDate.toLocaleString('en-US', options)
    const date = formattedDate.split('/').reverse().join('-')
    axiosInstance
      .get(`/available-slots`, {
        params: {
          date: date,
          duration: totalDuration,
        },
      })
      .then((response) => {
        setAvailableSlots(response.data.slots)
        setError(null)
      })
      .catch((err) => {
        setError('Failed to load available slots.')
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [selectedDate, selectedServices])

  const handleDeleteService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service._id !== serviceId),
    )
  }
  const handleBookAppointment = async () => {
    let dateString = selectedDate.toLocaleDateString('en-CA')

    try {
        const response = await axiosInstance.post('/create-appointment', {
            date:dateString, time:selectedTime, services:selectedServices, note
        })

        if (response.data && response.data.appointment) {
            console.log(response.data.appointmnet)
        }
        navigate('/appointment')
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message)
        }
    } 
  }

  return (
    <Box
      sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: 4 }}
    >
      <Container>
        <Typography variant="h3" color="primary" align="center" gutterBottom>
          Choose Your Appointment Time
        </Typography>

        {/* Service Details */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Your Selected Services
          </Typography>
          {selectedServices.length === 0 ? (
            <Typography variant="h6" align="center" color="error">
              No services selected. Please go back a page to select a service.
            </Typography>
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid container spacing={6} alignItems="center">
                      <Typography variant="h6">
                        {selectedServices.length > 1
                          ? `${selectedServices.length} services`
                          : `${selectedServices[0].serviceName}`}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {formatDuration(totalDuration)}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        ${totalPrice}
                      </Typography>
                    </Grid>
                  </AccordionSummary>
                  <Divider />
                  {selectedServices.map((service, index) => (
                    <AccordionDetails
                      key={index}
                      sx={{
                        padding: '12px 16px',
                        '&:not(:last-child)': {
                          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid size={{ xs: 6, sm: 4 }}>
                          <Typography variant="body1">
                            {service.serviceName}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{ xs: 2 }}
                          sx={{ paddingRight: '1rem', marginLeft: 4 }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            {formatDuration(service.duration)}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 2, sm: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            ${service.price}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{ xs: 1, sm: 1 }}
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteService(service._id)}
                            sx={{
                              padding: 0,
                              color: 'rgba(0,0,0,0.5)',
                              '&:hover': { color: '#FF6F61' },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Date and Time Slot Selection */}
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {loading ? (
              <CircularProgress />
            ) : availableSlots.length === 0 ? (
              <Typography variant="h6" color="grey" align="center">
                No Available Time Slot Left
              </Typography>
            ) : (
              <TimeSlotSelector
                slots={availableSlots}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}
          </Grid>
        </Grid>

        {/* Notes and Submit */}
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <TextField
            label="Note (optional)"
            value={note}
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ maxWidth: '500px', width: '100%' }}
            onChange={({ target }) => setNote(target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleBookAppointment}
            sx={{
              maxWidth: '200px',
              width: '100%',
              padding: '10px 0',
              fontSize: '1rem',
              textTransform: 'none'
            }}
          >
            Book Appointment
          </Button>
        </Box>
        {error && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default Schedule
