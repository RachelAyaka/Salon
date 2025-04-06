import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C9D8C5', // Muted Sage Green
      light: '#E3F0D2', // Light Sage Green
      dark: '#8B9E83', // Dark Sage Green
      // main: '#E8C7C8', // Soft pink
      // light: '#F5DEDF', // Lighter pink
      // dark: '#D19FA0', // Deeper pink
    },
    secondary: {
      // main: '#C9D8C5', // Muted Sage Green
      // light: '#E3F0D2', // Light Sage Green
      // dark: '#8B9E83', // Dark Sage Green
      main: '#E8C7C8', // Soft pink
      light: '#F5DEDF', // Lighter pink
      dark: '#D19FA0', // Deeper pink
    },
    background: {
      default: '#F8F5F2', // Warm off-white for page background
      paper: '#FFFFFF',   // Pure white for card backgrounds
    },
    text: {
      primary: '#4A4A4A',  // Softer than black for main text
      secondary: '#767676', // Medium gray for secondary text
    },
    error: {
      main: '#D8836D', // Softer error red
    },
    success: {
      main: '#9DB0A3', // Sage green for success states
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Prevents all-caps buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Global border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          padding: '10px 24px',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
          },
        },
      },
    },
  },
});

export default theme;