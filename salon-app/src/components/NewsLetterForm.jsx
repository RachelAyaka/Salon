// components/NewsletterForm.jsx
import { useState } from 'react'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import axiosInstance from '../utils/axiosInstance'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    })

    try {
      const response = await axiosInstance.get('/subscribe', email)

      const data = await response.json()

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Subscription successful!' },
        })
        setEmail('')
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: {
            error: true,
            msg: data.message || 'An error occurred. Please try again.',
          },
        })
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again.' },
      })
    }
  }

  return (
    <Box
      component="section"
      sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center', mt: 4, px: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        SUBSCRIBE TO OUR EMAILS
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Be the first to know about new events and exclusive offers.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={status.submitting}
        >
          {status.submitting ? 'Subscribing...' : '→'}
        </Button>
      </Box>

      {status.info.msg && (
        <Alert
          severity={status.info.error ? 'error' : 'success'}
          sx={{ mt: 2 }}
        >
          {status.info.msg}
        </Alert>
      )}
    </Box>
  )
}
