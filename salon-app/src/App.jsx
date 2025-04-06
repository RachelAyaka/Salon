import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import Booking from './pages/Booking/Booking';
// import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Schedule from './pages/Booking/Schedule/Schedule';
import Appointment from './pages/Appointment/Appointment';
import Policy from './pages/Policy/Policy';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Router>
        <CssBaseline /> {/* This normalizes styles and applies the theme's background */}
        <Box sx={{ 
          bgcolor: 'background.default',
          minHeight: '100vh', // Makes the background extend to full viewport height
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Navbar/>
          
          <Routes>
            {/* <Route path="/dashboard" exact element={<Dashboard />} /> */}
            <Route path="/" exact element={<Home />} />
            <Route path="/booking" exact element={<Booking />} />
            <Route path="/booking/schedule" exact element={<Schedule />} />
            <Route path="/appointment" exact element={<Appointment/>}/>
            <Route path='/policy' exact element={<Policy/>}/>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>

          <Footer/>
        </Box>
      </Router>
    </>
  );
};

export default App;