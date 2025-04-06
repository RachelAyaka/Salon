import { Link } from 'react-router-dom'
import {
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Policy = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const policies = [
    {
      title: 'Appointment Policy',
      content: `
        • Please arrive 10 minutes prior to your scheduled appointment time.
        • Late arrivals may result in reduced service time or rescheduling.
        • We require a credit card to hold your appointment.
        • For new clients, please complete our intake form prior to your appointment.
      `,
    },
    {
      title: 'Cancellation Policy',
      content: `
        • We require 24-hour notice for cancellations.
        • Cancellations with less than 24-hour notice will be charged 50% of the service price.
        • No-shows will be charged 100% of the service price.
        • We understand emergencies happen and will handle these situations on a case-by-case basis.
      `,
    },
    {
      title: 'Payment Policy',
      content: `
        • We accept cash, credit cards, and major digital payment methods.
        • Gratuity is not included in service prices.
        • Gift certificates are available for purchase and are non-refundable.
        • Package services must be paid in full at time of purchase.
      `,
    },
    {
      title: 'Refund Policy',
      content: `
        • If you are unsatisfied with your service, please let us know within 7 days and we will work to resolve the issue.
        • Product returns are accepted within 14 days with receipt for store credit only.
        • Opened products cannot be returned unless defective.
        • Special order items are non-refundable.
      `,
    },
    {
      title: 'Children Policy',
      content: `
        • Children are welcome for scheduled services.
        • For safety reasons, children not receiving services should not accompany clients to their appointments.
        • We are unable to provide childcare while you receive your service.
      `,
    },
    {
      title: 'Phone & Electronics Policy',
      content: `
        • To maintain our peaceful environment, please set phones to silent mode.
        • If you need to take a call, please step outside to avoid disturbing other clients.
        • We ask that you respect the privacy of other guests by not taking photos in service areas.
      `,
    },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Page Header */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%,  #fdfcfb 100%)`,
          borderRadius: { xs: 2, md: 4 },
          p: { xs: 2, sm: 3, md: 5 },
          mb: { xs: 3, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
          }}
        >
          Policy
        </Typography>
      </Box>

      <Container maxWidth="md" disableGutters={isMobile}>
        {/* Introduction */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            At Aya's Lash, we strive to provide all our clients with exceptional
            service in a peaceful, welcoming environment. To ensure the best
            experience for everyone, we've established the following policies.
            We appreciate your understanding and cooperation.
          </Typography>
        </Paper>

        {/* Policies Accordion */}
        {policies.map((policy, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              '& .MuiAccordionSummary-content': {
                margin: { xs: '10px 0', md: '12px 0' },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                }}
              >
                {policy.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="div"
                sx={{
                  whiteSpace: 'pre-line',
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                }}
              >
                {policy.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Additional Information */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mt: { xs: 4, md: 6 },
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
            }}
          >
            Questions About Our Policies?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            If you have any questions or concerns about our policies, please
            don't hesitate to contact us. We're happy to provide clarification
            and work with you to ensure your experience with us is nothing short
            of exceptional.
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { sm: 'space-between' },
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="outlined"
              fullWidth={isMobile}
              sx={{
                borderRadius: { xs: 1, md: 2 },
                py: { xs: 1, md: 1.5 },
              }}
            >
              Return to Home
            </Button>
            <Button
              component={Link}
              to="/booking"
              variant="contained"
              color="secondary"
              fullWidth={isMobile}
              sx={{
                borderRadius: { xs: 1, md: 2 },
                py: { xs: 1, md: 1.5 },
              }}
            >
              Book an Appointment
            </Button>
          </Box>
        </Paper>
      </Container>
    </Container>
  )
}

export default Policy
