import { useEffect, useState } from 'react'
import Status from '../constants/Status'
import axiosInstance from '../utils/axiosInstance'
function useContactForm() {
  const [updateContactFormSuccessful, setUpdateContactFormSuccessful] =
    useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const [nameStatus, setNameStatus] = useState({
    status: Status.IDLE,
    errorMessage: '',
  })
  const [emailStatus, setEmailStatus] = useState({
    status: Status.IDLE,
    errorMessage: '',
  })
  const [phoneStatus, setPhoneStatus] = useState({
    status: Status.IDLE,
    errorMessage: '',
  })
  const [messageStatus, setMessageStatus] = useState({
    status: Status.IDLE,
    errorMessage: '',
  })
  const nameHasError = () => {
    return nameStatus.status === Status.ERROR
  }
  const emailHasError = () => {
    return emailStatus.status === Status.ERROR
  }
  const phoneHasError = () => {
    return phoneStatus.status === Status.ERROR
  }
  const messageHasError = () => {
    return messageStatus.status === Status.ERROR
  }
  const handleNameFieldChange = () => {
    setNameStatus({
      status: Status.IDLE,
      errorMessage: '',
    })
  }
  const handleEmailFieldChange = () => {
    setEmailStatus({
      status: Status.IDLE,
      errorMessage: '',
    })
  }
  const handlePhoneFieldChange = () => {
    setPhoneStatus({
      status: Status.IDLE,
      errorMessage: '',
    })
  }
  const handleMessageFieldChange = () => {
    setMessageStatus({
      status: Status.IDLE,
      errorMessage: '',
    })
  }
  const isContactFormMissingField = () => {
    if (!name) {
      setNameStatus({
        status: Status.ERROR,
        errorMessage: 'Please type in your full name.',
      })
      emptyFieldExists = true
    }
    if (!email) {
      setEmailStatus({
        status: Status.ERROR,
        errorMessage: 'Please type in your new email.',
      })
      emptyFieldExists = true
    }
    if (!phone) {
      setPhoneStatus({
        status: Status.ERROR,
        errorMessage: 'Please type in your new phone number.',
      })
      emptyFieldExists = true
    }
    if (!message) {
      setMessageStatus({
        status: Status.ERROR,
        errorMessage: 'Please type in your message.',
      })
      emptyFieldExists = true
    }
    return emptyFieldExists
  }
  const handleClickContactFormUpdate = () => {
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isContactFormMissingField()) {
      return false
    }
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    })

    try {
      const response = await axiosInstance.post('/contact', {
        name: name,
        email: email,
        phone: phone,
        message: message,
      })
      const data = response.data

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' },
        })
        handleClickContactFormUpdate()
        return true
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
      console.log(error)
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again.' },
      })
    }
    return false
  }

  return {
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
    handleClickContactFormUpdate,
    handleSubmit,
    nameHasError,
    emailHasError,
    phoneHasError,
    messageHasError,
    setName,
    setEmail,
    setPhone,
    setMessage,
  }
}
export default useContactForm
