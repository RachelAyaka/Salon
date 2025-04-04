// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// import PasswordInput from '../../components/Input/PasswordInput'
// import { validateEmail } from '../../utils/helper'

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.')
//       return
//     }
//     if (!password) {
//       setError('Please enter the password.')
//       return
//     }
//     setError('')

//     //Login API Call
//   }

//   return (
//     <>
//       <div className="flex items-center justify-center mt-28">
//         <div className="w-96 border rounded bg-white px-7 py-10">
//           <form onSubmit={handleLogin}>
//             <h4 className="text-2xl mb-7">Login</h4>
//             <input
//               type="text"
//               placeholder="Email"
//               className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <PasswordInput
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

//             <button
//               type="submit"
//               className="w-full text-sm bg-primary text-white p-2 rounded my-1 hover:bg-blue-600"
//             >
//               Login
//             </button>
//             <p className="text-sm text-center mt-4">
//               Not registered yet?{' '}
//               <Link to="/signUp" className="font-medium text-primary underline">
//                 Create an Account
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import { TextField, Button, Typography, Box, Container } from '@mui/material'
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
    <Container component="main" maxWidth="xs" sx={{ padding: 2 }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: 3,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Login
        </Typography>

        <TextField
          label="Email"
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

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Not registered yet?{' '}
          <Link
            to="/signUp"
            style={{ fontWeight: '500', textDecoration: 'underline' }}
          >
            Create an Account
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Login
