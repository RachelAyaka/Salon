import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { TextField, InputAdornment, IconButton } from '@mui/material'

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <TextField
      label={placeholder || 'Password'}
      variant="outlined"
      type={isShowPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              <FontAwesomeIcon icon={isShowPassword ? faEye : faEyeSlash} />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          borderRadius: 30, // Rounded corners for the input field
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 30, // Rounded corners for the input field
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
  )
}

export default PasswordInput
