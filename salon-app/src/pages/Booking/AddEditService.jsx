import React, { useState } from 'react'
import { IconButton, TextField, Button, Box, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import axiosInstance from '../../utils/axiosInstance'

const AddEditService = ({ serviceData, type, getAllServices, onClose }) => {
  const [serviceName, setServiceName] = useState(serviceData?.serviceName || '')
  const [description, setDescription] = useState(serviceData?.description || '')
  const [duration, setDuration] = useState(serviceData?.duration || 0)
  const [price, setPrice] = useState(serviceData?.price || 0)

  const [error, setError] = useState(null)

  const addNewService = async () => {
    try {
      const response = await axiosInstance.post('/create-service', {
        serviceName,
        description,
        duration,
        price,
      })

      if (response.data && response.data.service) {
        getAllServices()
        onClose()
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      }
    }
  }

  const editService = async () => {
    const serviceId = serviceData._id
    try {
      const response = await axiosInstance.put('/edit-service/' + serviceId, {
        serviceName,
        description,
        duration,
        price,
      })

      if (response.data && response.data.service) {
        getAllServices()
        onClose()
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      }
    }
  }

  const handleAddEditService = () => {
    if (!serviceName) {
      setError('Please enter the service name.')
      return
    }

    if (!description) {
      setError('Please enter the description.')
      return
    }

    if (!duration) {
      setError('Please enter the duration.')
      return
    }

    if (!price) {
      setError('Please enter the price.')
      return
    }

    setError('')

    if (type === 'edit') {
      editService()
    } else {
      addNewService()
    }
  }

  return (
    <Box sx={{ position: 'relative', p: 3, width: '100%', maxWidth: 400 }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: -12,
          right: -12,
          color: 'rgba(0, 0, 0, 0.54)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Box>
        <Typography variant="h6" sx={{ padding: 2, textAlign: 'left' }}>
          Service
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Service Name
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Service Name"
          value={serviceName}
          onChange={({ target }) => setServiceName(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Description
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Duration
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          rows={4}
          placeholder="Duration"
          value={duration}
          onChange={({ target }) => setDuration(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Price
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          rows={4}
          placeholder="Price"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      {error && (
        <Typography variant="body2" sx={{ color: 'error.main', mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleAddEditService}
      >
        {type === 'edit' ? 'Update' : 'Add'}
      </Button>
    </Box>
  )
}

export default AddEditService
