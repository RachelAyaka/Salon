import React, { useState } from 'react'
import { Box, Button, Typography, Grid, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Helper function to get days in a month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() // Day of the week for the 1st of the month
    let days = []
    let day = 1

    // Fill in days of the previous month in the first row (if needed)
    for (let i = 0; i < startingDay; i++) {
      days.push(null) // empty spaces before the start of the month
    }

    // Add days of the current month
    for (let i = startingDay; i < 7; i++) {
      days.push(day++)
    }
    for (let i = day; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Function to handle month change
  const changeMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      )

      // Prevent selecting previous dates
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Set time to 00:00 to compare only the date

      if (newDate < today) {
        return // Don't allow selecting previous dates
      }

      setSelectedDate(newDate)
    }
  }

  const renderHeader = () => {
    const monthName = currentMonth.toLocaleString('default', { month: 'long' })
    const year = currentMonth.getFullYear()

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={() => changeMonth(-1)}
          sx={{ color: 'primary.main' }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {monthName} {year}
        </Typography>
        <IconButton
          onClick={() => changeMonth(1)}
          sx={{ color: 'primary.main' }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: 350,
        border: '1px solid #ddd',
        borderRadius: 3,
        padding: 3,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      {renderHeader()}
      <Grid
        container
        spacing={1}
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Grid key={index}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
        {daysInMonth.map((day, index) => {
          const currentDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
          )
          const today = new Date()
          today.setHours(0, 0, 0, 0) // Set time to 00:00 to compare only the date
          const isPastDate = currentDate < today

          return (
            <Grid
              container
              key={index}
              spacing={1}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                // fullWidth
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  color: day
                    ? isPastDate
                      ? 'grey.500'
                      : 'text.primary'
                    : 'transparent',
                  backgroundColor:
                    day === selectedDate?.getDate()
                      ? 'primary.main'
                      : 'transparent',
                  borderColor: 'transparent',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor:
                      day && !isPastDate ? '#f0f0f0' : 'transparent',
                    borderColor: day && !isPastDate ? '#ddd' : 'transparent',
                  },
                  '&.MuiButton-root.Mui-disabled': {
                    color: 'grey.500',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  },
                }}
                onClick={() => handleDateClick(day)}
                disabled={!day || isPastDate}
              >
                {day}
              </Button>
            </Grid>
          )
        })}
      </Grid>
      {selectedDate && (
        <Typography variant="body2" sx={{ marginTop: 2, fontWeight: 500 }}>
          <span style={{ color: '#1976d2' }}>Selected Date: </span>
          {selectedDate.toLocaleDateString()}
        </Typography>
      )}
    </Box>
  )
}

export default Calendar
