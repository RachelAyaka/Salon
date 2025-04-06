import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PasswordInput from '../../components/Input/PasswordInput';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail, validatePhone } from '../../utils/helper';

const SignUp = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstTime, setFirstTime] = useState(false);
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(null);
  const [shape, setShape] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Invalid phone number. Please use the format XXX-XXX-XXXX.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter the password.');
      return;
    }
    setError('');

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
      });

      //handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        justifyContent: 'center',
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 }
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
          onSubmit={handleSignUp}
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
              marginBottom: 2,
              fontSize: { xs: '1.75rem', sm: '2.125rem' }
            }}
          >
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
            InputProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            InputLabelProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            sx={{ mb: 1 }}
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
            InputProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            InputLabelProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            sx={{ mb: 1 }}
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
            InputProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            InputLabelProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
            sx={{ mb: 1 }}
          />
          
          <FormGroup 
            sx={{ 
              marginTop: 1, 
              width: '100%',
              '& .MuiFormControlLabel-label': {
                fontSize: isMobile ? '0.9rem' : '1rem'
              }
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={firstTime}
                  onChange={(e) => setFirstTime(e.target.checked)}
                  name="firstTime"
                  color="primary"
                  sx={{ padding: isMobile ? '4px' : '9px' }}
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
                InputProps={{
                  style: { fontSize: isMobile ? '0.95rem' : '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: isMobile ? '0.95rem' : '1rem' }
                }}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Shape"
                placeholder="Cateye, Dolleye, etc. If you don't know, you may leave it blank."
                variant="outlined"
                fullWidth
                margin="normal"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                InputProps={{
                  style: { fontSize: isMobile ? '0.95rem' : '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: isMobile ? '0.95rem' : '1rem' }
                }}
                sx={{ mb: 1 }}
              />
            </>
          ) : null}

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{
              style: { fontSize: isMobile ? '0.95rem' : '1rem' }
            }}
          />

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ 
                mt: 1, 
                textAlign: 'center',
                fontSize: { xs: '0.8rem', sm: '0.875rem' } 
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
            Create Account
          </Button>

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mt: 3,
              fontSize: { xs: '0.8rem', sm: '0.875rem' } 
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={{ fontWeight: '500', textDecoration: 'underline' }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;