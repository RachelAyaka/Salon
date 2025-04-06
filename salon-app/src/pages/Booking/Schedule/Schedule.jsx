import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  IconButton,
  Paper,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axiosInstance from '../../../utils/axiosInstance';
import { formatDuration } from '../../../utils/helper';
import TimeSlotSelector from './TimeSlotSelector';
import Calendar from './Calendar';

const Schedule = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices: initialServices } = location.state || {
    selectedServices: [],
  };
  const [selectedServices, setSelectedServices] = useState(initialServices);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [note, setNote] = useState("");

  const steps = ['Select Date', 'Choose Time', 'Confirm & Book'];

  useEffect(() => {
    if (selectedServices.length === 0) {
      navigate('/booking');
    }
  }, [selectedServices, navigate]);

  // Get available slots for the selected date
  useEffect(() => {
    let accumulatedDuration = 0;
    let accumulatedPrice = 0;

    // Loop through selected services to calculate total duration and price
    selectedServices.forEach((service) => {
      accumulatedDuration += service.duration;
      accumulatedPrice += service.price;
    });

    // Update the state once with the calculated totals
    setTotalDuration(accumulatedDuration);
    setTotalPrice(accumulatedPrice);
    setLoading(true);

    //makes sure date is in PST
    const options = {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = selectedDate.toLocaleString('en-US', options);
    const date = formattedDate.split('/').reverse().join('-');
    axiosInstance
      .get(`/available-slots`, {
        params: {
          date: date,
          duration: totalDuration,
        },
      })
      .then((response) => {
        setAvailableSlots(response.data.slots);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to load available slots.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate, selectedServices]);

  const handleDeleteService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service._id !== serviceId)
    );
  };
  
  const handleBookAppointment = async () => {
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }
    
    let dateString = selectedDate.toLocaleDateString('en-CA');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/create-appointment', {
        date: dateString, 
        time: selectedTime, 
        services: selectedServices, 
        note
      });

      if (response.data && response.data.appointment) {
        console.log(response.data.appointment);
      }
      navigate('/appointment');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while booking your appointment');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ 
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh', 
        paddingY: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          marginBottom: { xs: 3, md: 4 },
          textAlign: 'center' 
        }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            color="primary" 
            fontWeight="600"
            gutterBottom
          >
            Book Your Appointment
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: '600px', margin: '0 auto' }}
          >
            Select a date and time that works for you
          </Typography>
        </Box>

        {/* Service Summary Card */}
        <Card 
          elevation={2}
          sx={{ 
            marginBottom: { xs: 3, md: 4 }, 
            borderRadius: 2,
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ padding: { xs: 2, md: 3 } }}>
            <Typography 
              variant="h6" 
              fontWeight="600" 
              sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}
            >
              <EventNoteIcon sx={{ marginRight: 1, color: 'primary.main' }} />
              Your Selected Services
            </Typography>
            
            {selectedServices.length === 0 ? (
              <Alert severity="warning">
                No services selected. Please go back to select a service.
              </Alert>
            ) : (
              <Box>
                <Accordion 
                  defaultExpanded 
                  elevation={0}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px !important',
                    overflow: 'hidden',
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{xs:6, sm:6}}>
                        <Typography variant="subtitle1" fontWeight="600">
                          {selectedServices.length > 1
                            ? `${selectedServices.length} services`
                            : `${selectedServices[0].serviceName}`}
                        </Typography>
                      </Grid>
                      <Grid size={{xs:3, sm:3}} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDuration(totalDuration)}
                        </Typography>
                      </Grid>
                      <Grid size={{xs:3, sm:3}}sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1" fontWeight="600" color="primary.main">
                          ${totalPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  
                  {selectedServices.map((service, index) => (
                    <AccordionDetails
                      key={index}
                      sx={{
                        padding: '16px',
                        '&:not(:last-child)': {
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        },
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid size={{xs:6, sm:6}}>
                          <Typography variant="body1">
                            {service.serviceName}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:2, sm:2}} sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {formatDuration(service.duration)}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:2, sm:2}} sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" >
                            ${service.price}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:2, sm:2}} sx={{ textAlign: 'right' }}>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteService(service._id)}
                            size="small"
                            sx={{
                              color: 'rgba(0,0,0,0.5)',
                              '&:hover': { color: '#FF6F61' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Date and Time Selection */}
        <Grid container spacing={3} sx={{ marginBottom: { xs: 3, md: 4 } }}>
          <Grid size={{xs:12, md:5}}>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Grid>
          <Grid size={{xs:12, md:7}}>
            <TimeSlotSelector
              slots={availableSlots}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              loading={loading}
            />
          </Grid>
        </Grid>

        {/* Notes and Book Button */}
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:8}}>
            <TextField
              label="Notes (optional)"
              value={note}
              onChange={({ target }) => setNote(target.value)}
              placeholder="Any special requests or information"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              sx={{ 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>
          <Grid size={{xs:12, md:4}} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant="contained"
              size="large"
              disabled={!selectedTime || loading}
              onClick={handleBookAppointment}
              sx={{
                height: { xs: '50px', md: '56px' },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '16px',
                textTransform: 'none',
                marginBottom: 2,
                boxShadow: 2,
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Confirm Booking'
              )}
            </Button>
            
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            
            <Paper elevation={1} sx={{ padding: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Appointment Summary:
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {selectedDate.toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                <strong>Time:</strong> {selectedTime || 'Not selected'}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {formatDuration(totalDuration)}
              </Typography>
              <Typography variant="body2" fontWeight="600" color="primary.main">
                <strong>Total:</strong> ${totalPrice}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Schedule;