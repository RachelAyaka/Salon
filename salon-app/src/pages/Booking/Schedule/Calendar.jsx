import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ArrowBack, ArrowForward, CalendarToday } from '@mui/icons-material'

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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

  const isDateSelected = (day) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    )
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
          padding: { xs: '0 8px', md: '0 16px' },
        }}
      >
        <IconButton
          onClick={() => changeMonth(-1)}
          sx={{
            color: 'primary.main',
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
          }}
          size={isMobile ? 'small' : 'medium'}
        >
          <ArrowBack fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <CalendarToday
            sx={{ color: 'primary.main', fontSize: isMobile ? 16 : 20 }}
          />
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{ fontWeight: 600 }}
          >
            {monthName} {year}
          </Typography>
        </Box>

        <IconButton
          onClick={() => changeMonth(1)}
          sx={{
            color: 'primary.main',
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
          }}
          size={isMobile ? 'small' : 'medium'}
        >
          <ArrowForward fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      </Box>
    )
  }

  // Get today's date for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '100%', sm: 350 },
        borderRadius: 3,
        padding: { xs: 2, md: 3 },
        backgroundColor: 'background.paper',
        height: '100%',
      }}
    >
      {renderHeader()}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: { xs: 0.5, md: 1 },
          marginBottom: 1,
        }}
      >
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: 'text.secondary',
                fontSize: { xs: '12px', md: '14px' },
              }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: { xs: 0.5, md: 1 },
        }}
      >
        {daysInMonth.map((day, index) => {
          if (day === null) {
            return <Box key={index} />
          }

          const currentDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
          )
          const isPastDate = currentDate < today
          const isToday =
            currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
          const isSelected = isDateSelected(day)

          return (
            <Button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={isPastDate}
              variant={isSelected ? 'contained' : 'text'}
              sx={{
                minWidth: { xs: 30, md: 36 },
                height: { xs: 30, md: 36 },
                padding: 0,
                borderRadius: '50%',
                color: isPastDate
                  ? 'grey.400'
                  : isSelected
                    ? 'white'
                    : isToday
                      ? 'primary.main'
                      : 'text.primary',
                border: isToday && !isSelected ? '1px solid' : 'none',
                borderColor: 'primary.main',
                fontWeight: isToday || isSelected ? 600 : 400,
                position: 'relative',
                '&:hover': {
                  backgroundColor: isPastDate
                    ? 'transparent'
                    : isSelected
                      ? 'primary.dark'
                      : 'action.hover',
                },
                fontSize: { xs: '12px', sm: '14px' },
              }}
            >
              {day}
            </Button>
          )
        })}
      </Box>

      {selectedDate && (
        <Box
          sx={{
            marginTop: 2,
            padding: 1,
            backgroundColor: 'primary.light',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'primary.contrastText',
              fontWeight: 500,
              fontSize: { xs: '12px', md: '14px' },
            }}
          >
            Selected: {selectedDate.toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default Calendar
