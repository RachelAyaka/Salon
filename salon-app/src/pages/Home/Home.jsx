import React, { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import ContactForm from '../../components/ContactForm'
import NewsletterForm from '../../components/NewsLetterForm'

const Home = () => {
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllServices = async () => {
    try {
      const response = await axiosInstance.get('/get-services')
      if (response.data && response.data.services) {
        setServices(response.data.services)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllServices()
    return () => {}
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(shotByKian.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, px: 3 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Aya's Lash
          </Typography>
          <Typography variant="h5" component="h2" paragraph>
            Your sanctuary for beauty and relaxation
          </Typography>
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3, px: 4, py: 1 }}
          >
            Book Your Appointment
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        {/* About Section */}
        <Box sx={{ mb: 8, textAlign: 'center', px: { xs: 2, md: 10 } }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Your Journey to Relaxation Begins Here
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            At Aya's Lash studio, we believe in creating a tranquil environment
            where you can escape the stresses of everyday life. We are dedicated
            to providing exceptional service tailored to your individual vision.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Using only premium products and unique techniques, we ensure that
            you leave our studio feeling refreshed and confident.
          </Typography>
        </Box>

        {/* Services Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {loading ? (
              <Typography>Loading services...</Typography>
            ) : (
              services.map((service) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service._id}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* <CardMedia
                        component="img"
                        height="140"
                        image={service.image}
                        alt={service.serviceName}
                      /> */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {service.serviceName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {service.description}
                      </Typography>
                      <Typography variant="h6">${service.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        {/* Products Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Featured Products
          </Typography>
          <Grid container spacing={4}>
            {loading ? (
              <Typography>Loading products...</Typography>
            ) : (
              products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {product.description}
                      </Typography>
                      <Typography variant="h6">{product.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 6,
            borderRadius: 2,
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Transform Your Look?
          </Typography>
          <Typography variant="body1" paragraph>
            Book your appointment today and experience the difference.
          </Typography>
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Book Now
          </Button>
        </Box>

        <ContactForm/>
        {/* <NewsletterForm/> */}
      </Container>
    </Box>
  )
}

export default Home
