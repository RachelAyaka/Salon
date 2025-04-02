// import { useState } from 'react'
// import PasswordInput from '../../components/Input/PasswordInput'
// import { Link } from 'react-router-dom'
// import { validateEmail } from '../../utils/helper'

// const SignUp = () => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)

//   const handleSignUp = async (e) => {
//     e.preventDefault()

//     if (!name) {
//       setError('Please enter your name.')
//       return
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.')
//       return
//     }
//     if (!password) {
//       setError('Please enter the password.')
//       return
//     }
//     setError('')

//     //SignUp API Call
//   }
//   return (
//     <>
//       <div className="flex items-center justify-center mt-28">
//         <div className="w-96 border rounded bg-white px-7 py-10">
//           <form onSubmit={handleSignUp}>
//             <h4 className="text-2xl mb-7">SignUp</h4>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
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
//               Create Account
//             </button>
//             <p className="text-sm text-center mt-4">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-primary underline">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignUp
import { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { TextField, Button, Typography, Box, Container } from '@mui/material'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError('Please enter your name.')
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
          label="Name"
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
