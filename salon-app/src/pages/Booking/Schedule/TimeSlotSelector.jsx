import React from 'react'
import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material'

const TimeSlotSelector = ({
  slots,
  selectedTime,
  setSelectedTime,
  loading,
}) => {
  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Select a Time Slot
      </Typography>
      <Typography variant="h8" gutterBottom>
        Times are shown in PDT
      </Typography>

      {loading ? (
        // Show loading spinner while slots are being fetched
        <CircularProgress size={50} sx={{ color: '#1976d2' }} />
      ) : slots.length === 0 ? (
        // Show "Go to Next Available Date" if no slots are available
        <Typography
          variant="contained"
          color="black"
          fullWidth
          sx={{
            padding: '10px',
            backgroundColor: '#b0bec5', // Light gray for unavailable state
            '&:hover': {
              backgroundColor: '#78909c', // Slightly darker gray on hover
            },
          }}
        >
          No Available Time Slot Left
        </Typography>
      ) : (
        // Show time slots if available
        <Grid container spacing={2} justifyContent="left">
          {slots.map((slot, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  padding: '12px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  borderColor: '#1976d2', // Blue border
                  color: selectedTime === slot ? 'white' : 'text.primary',
                  backgroundColor:
                    selectedTime === slot ? '#1976d2' : 'transparent',
                  '&:hover': {
                    borderColor: '#1565c0', // Darker blue on hover
                    backgroundColor:
                      selectedTime === slot ? '#1565c0' : '#e3f2fd',
                  },
                }}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default TimeSlotSelector
