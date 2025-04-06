import React from 'react'
import {
  Typography,
  Container,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        pt: { xs: 4, md: 6 },
        pb: { xs: 4, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 3}>
          {/* Location Section */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Location
            </Typography>
            <Typography
              variant="body2"
              component="address"
              sx={{
                mt: 2,
                fontStyle: 'normal',
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
              }}
            >
              123 Beauty Lane
              <br />
              New York, 10026
              <br />
              <a
                href="tel:8581234567"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                (858) 123-4567
              </a>
            </Typography>
          </Grid>

          {/* Hours Section */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Hours
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                mt: 2,
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
              }}
            >
              Monday - Thursday: 3PM - 6PM
              <br />
              Friday - Sunday: 8AM - 6PM
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                  fontSize: isMobile ? '0.85rem' : '0.875rem',
                }}
              >
                Home
              </Link>
              <Link
                to="/policy"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                  fontSize: isMobile ? '0.85rem' : '0.875rem',
                }}
              >
                Policy
              </Link>
              <Link
                to="/booking"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.85rem' : '0.875rem',
                }}
              >
                Book Now
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            mt: { xs: 4, sm: 6 },
            textAlign: 'center',
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            opacity: 0.9,
          }}
        >
          © {new Date().getFullYear()} Aya's Lash. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
