import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter the password.')
      return
    }
    setError('')

    // Login API Call
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      })

      //handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/')
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        justifyContent: 'center',
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            padding: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              marginBottom: 3,
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
            }}
          >
            Login
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Log in to book an appointment!
          </Typography>

          <TextField
            label="Email"
            required
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !validateEmail(email)}
            helperText={!!error && !validateEmail(email) ? error : ''}
            InputProps={{
              style: { fontSize: '0.95rem' },
            }}
            sx={{ mb: 1 }}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                mt: 1,
                textAlign: 'center',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 30,
              padding: { xs: '8px', sm: '10px' },
              fontWeight: 600,
              marginTop: 2,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Not registered yet?{' '}
            <Link
              to="/signup"
              style={{ fontWeight: '500', textDecoration: 'underline' }}
            >
              Create an Account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
