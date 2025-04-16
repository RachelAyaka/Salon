import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import useContactForm from '../hooks/useContactForm'

export default function ContactForm() {
  const {
    name,
    email,
    phone,
    message,
    status,
    nameStatus,
    emailStatus,
    phoneStatus,
    messageStatus,
    handleNameFieldChange,
    handleEmailFieldChange,
    handlePhoneFieldChange,
    handleMessageFieldChange,
    handleSubmit,
    nameHasError,
    emailHasError,
    phoneHasError,
    messageHasError,
    setName,
    setEmail,
    setPhone,
    setMessage,
  } = useContactForm()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Get in touch with us!
      </Typography>

      <TextField
        fullWidth
        required
        variant="outlined"
        label="Full Name"
        name="name"
        value={name}
        error={nameHasError()}
        helperText={nameHasError() && nameStatus.errorMessage}
        onChange={(event) => {
          handleNameFieldChange()
          setName(event.target.value)
        }}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Email"
        name="email"
        type="email"
        value={email}
        error={emailHasError()}
        helperText={emailHasError() && emailStatus.errorMessage}
        onChange={(event) => {
          handleEmailFieldChange()
          setEmail(event.target.value)
        }}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Phone number"
        name="phone"
        type="tel"
        value={phone}
        error={phoneHasError()}
        helperText={phoneHasError() && phoneStatus.errorMessage}
        onChange={(event) => {
          handlePhoneFieldChange()
          setPhone(event.target.value)
        }}
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Message"
        name="message"
        multiline
        rows={4}
        value={message}
        error={messageHasError()}
        helperText={messageHasError() && messageStatus.errorMessage}
        onChange={(event) => {
          handleMessageFieldChange()
          setMessage(event.target.value)
        }}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={status.submitting}
        sx={{ mt: 2 }}
      >
        {status.submitting ? 'Sending...' : 'Send'}
      </Button>

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
