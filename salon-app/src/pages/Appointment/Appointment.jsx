import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  Avatar, 
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  Container
} from '@mui/material'
import { 
  CalendarToday, 
  AccessTime, 
  Notes, 
  ShoppingBag,
  Assignment,
  ArrowForward,
  MoreVert,
  ArrowBack
} from '@mui/icons-material'
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils/helper';
import moment from 'moment-timezone';

const Appointment = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
      }
      navigate('/login');
    }
  };

  const fetchAppointments = async () => {
    try {
      if (!userInfo) return;
      setLoading(true);
      const id = userInfo._id;
      const response = await axiosInstance.get('/get-appointment-by-user/' + id);
      
      const nowInPST = moment().tz('America/Los_Angeles')
      const upcoming = [];
      const past = [];

      if (Array.isArray(response.data.appointments)) {
        response.data.appointments.forEach(appointment => {
            const appointmentDateTimeStr = `${appointment.date} ${appointment.time}`;
            const appointmentDateTime = moment.tz(appointmentDateTimeStr, 'YYYY-MM-DD HH:mm', 'America/Los_Angeles')
          if (appointmentDateTime.isAfter(nowInPST)) {
            upcoming.push(appointment);
          } else {
            past.push(appointment);
          }
        });
      } else {
        console.error("Expected an array but got:", response.data);
      }

      upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
      past.sort((a, b) => new Date(b.date) - new Date(a.date));

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  
  useEffect(() => {
    if (userInfo) {
      fetchAppointments();
    }
  }, [userInfo]);

  const formatDate = (date) => {
    const newDate = new Date(date  + 'T00:00:00-08:00');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const dayOfWeek = daysOfWeek[newDate.getDay()];
    const month = monthsOfYear[newDate.getMonth()];
    const day = date.slice(8,10);
    const year = date.slice(0,4);
  
    return isMobile ? `${month} ${day}` : `${dayOfWeek}, ${month} ${day}, ${year}`;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderAppointmentCard = (appointment) => {
    return (
      <Card 
        key={appointment._id} 
        sx={{ 
          mb: 2, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderRadius: '12px',
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            {!isMobile && (
              <Grid size={{xs:2, sm:2, md:1}}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%' 
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 60, 
                      height: 60,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {getInitials(appointment.client.fullName)}
                  </Avatar>
                </Box>
              </Grid>
            )}
            
            <Grid size={{xs:12, sm:10, md:11}}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                mb: 1,
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  mb: isMobile ? 1 : 0
                }}>
                  {isMobile && (
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        mr: 1.5,
                        width: 40, 
                        height: 40
                      }}
                    >
                      {getInitials(appointment.client.fullName)}
                    </Avatar>
                  )}
                  {isMobile && (
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                
                <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
                  <Chip 
                    label={formatDate(appointment.date)}
                    icon={<CalendarToday fontSize="small" />}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {appointment.time}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Services:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {appointment.services && appointment.services.length > 0 ? (
                  appointment.services.map((service) => (
                    <Chip 
                      key={service._id}
                      label={service.serviceName} 
                      size="small"
                      sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No services selected
                  </Typography>
                )}
              </Box>
              
              {appointment.product && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingBag fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Product: {appointment.product.name}
                  </Typography>
                </Box>
              )}
              
              {appointment.note && (
                <Box sx={{ 
                  display: 'flex', 
                  p: 1.5, 
                  bgcolor: 'rgba(255, 243, 224, 0.6)', 
                  borderRadius: 1,
                  mt: 1,
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <Notes fontSize="small" sx={{ 
                    mr: isMobile ? 0 : 1, 
                    mb: isMobile ? 1 : 0,
                    color: 'text.secondary' 
                  }} />
                  <Typography variant="body2">
                    {appointment.note}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderEmptyState = (message) => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Assignment sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  return (
    <>
      <Navbar userInfo={userInfo}/>
      <Container maxWidth="lg" disableGutters={isMobile}>
        <Box sx={{ 
          p: isMobile ? 2 : 3,
          pb: isMobile ? 5 : 3 // Extra padding at bottom for mobile to avoid buttons being covered by device UI
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3
          }}>
            {isMobile && (
              <IconButton 
                edge="start" 
                sx={{ mr: 1 }}
                onClick={() => navigate(-1)}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ fontWeight: 'bold' }}
            >
              My Appointments
            </Typography>
          </Box>
          
          <Paper 
            sx={{ 
              mb: 3, 
              borderRadius: isMobile ? '12px' : '4px',
              overflow: 'hidden'
            }}
            elevation={isMobile ? 0 : 1}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Upcoming" />
              <Tab label="Past" />
            </Tabs>
          </Paper>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {tabValue === 0 && (
                <>
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map(renderAppointmentCard)
                  ) : (
                    renderEmptyState("You don't have any upcoming appointments")
                  )}
                </>
              )}
              
              {tabValue === 1 && (
                <>
                  {pastAppointments.length > 0 ? (
                    pastAppointments.map(renderAppointmentCard)
                  ) : (
                    renderEmptyState("You don't have any past appointments")
                  )}
                </>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Appointment;