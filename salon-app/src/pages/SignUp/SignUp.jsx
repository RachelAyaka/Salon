import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import PasswordInput from '../../components/Input/PasswordInput'
import axiosInstance from '../../utils/axiosInstance'
import { validateEmail, validatePhone } from '../../utils/helper'

const SignUp = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [firstTime, setFirstTime] = useState(null)
  const [minLen, setMinLen] = useState(0)
  const [maxLen, setMaxLen] = useState(null)
  const [shape, setShape] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError('Please enter your name.')
      return
    }
    if (!validatePhone(phone)) {
      setError('Invalid phone number. Please use the format XXX-XXX-XXXX.')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter the password.')
      return
    }
    setError('')

    // SignUp API Call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        phone: phone,
        email: email,
        minLen: minLen,
        maxLen: maxLen,
        shape: shape,
        firstTime: firstTime,
        password: password,
      })

      //handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/dashboard')
      }
    } catch {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError('An unexcepted error occured. Please try again.')
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSignUp}
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Sign Up
        </Typography>

        <TextField
          label="Full Name"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error && !name}
          helperText={!!error && !name ? error : ''}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ddd',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
          }}
        />

        <TextField
          label="Phone"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!error && !validatePhone(phone)}
          helperText={!!error && !validatePhone(phone) ? error : ''}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ddd',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
          }}
        />

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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ddd',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
          }}
        />
        <FormGroup sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={firstTime}
                onChange={(e) => setFirstTime(e.target.checked)}
                name="firstTime"
                color="primary"
              />
            }
            label="First time getting lash extension?"
          />
        </FormGroup>
        {!firstTime ? (
          <>
            <TextField
              label="Max Length (mm)"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="If you don't know, you may leave it blank."
              type="number"
              value={maxLen}
              onChange={(e) => setMaxLen(e.target.value)}
              // inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 30,
                },
              }}
            />
            <TextField
              label="Shape"
              placeholder="Cateye, Dolleye, etc. If you don't know, you may leave it blank."
              variant="outlined"
              fullWidth
              margin="normal"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 30,
                },
              }}
            />
          </>
        ) : null}

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ddd',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',
            },
          }}
        />

        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1, textAlign: 'center' }}
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
            padding: '10px',
            fontWeight: 600,
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Create Account
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ fontWeight: '500', textDecoration: 'underline' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default SignUp
