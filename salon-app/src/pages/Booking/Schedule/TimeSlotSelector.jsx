import { Box, Button, Grid, Typography, CircularProgress, Paper, useTheme, useMediaQuery } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimeSlotSelector = ({
  slots,
  selectedTime,
  setSelectedTime,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Paper 
      elevation={3}
      sx={{ 
        padding: { xs: 2, md: 3 }, 
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 2 
      }}>
        <AccessTimeIcon sx={{ color: 'primary.main', marginRight: 1 }} />
        <Typography variant="h6" fontWeight="600">
          Select a Time
        </Typography>
      </Box>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ marginBottom: 3, textAlign: 'center' }}
      >
        All times shown in PDT
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      ) : slots.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'grey.100',
            borderRadius: 2,
            padding: 3,
            flex: 1
          }}
        >
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            align="center"
          >
            No time slots available for this date.
            Please select another date.
          </Typography>
        </Box>
      ) : (
        <Box 
          sx={{ 
            overflowY: 'auto', 
            maxHeight: { xs: '300px', md: '350px' },
            paddingRight: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 4,
            },
          }}
        >
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}
          >
            {slots.map((slot, index) => (
              <Grid size={{xs:6, sm:4, md:4}} key={index}>
                <Button
                  variant={selectedTime === slot ? "contained" : "outlined"}
                  fullWidth
                  sx={{
                    padding: { xs: '10px 6px', md: '12px' },
                    fontWeight: 500,
                    fontSize: { xs: '14px', md: '16px' },
                    borderRadius: '10px',
                    transition: 'all 0.2s',
                    borderColor: selectedTime === slot ? 'primary.main' : 'grey.300',
                    color: 'black',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: selectedTime === slot ? 4 : 1,
                    },
                  }}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default TimeSlotSelector;