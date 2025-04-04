import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './index.css'
import Booking from './pages/Booking/Booking'
// import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Schedule from './pages/Booking/Schedule/Schedule'
import Appointment from './pages/Appointment/Appointment'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/dashboard" exact element={<Dashboard />} /> */}
          <Route path="/" exact element={<Home />} />
          <Route path="/booking" exact element={<Booking />} />
          <Route path="/booking/schedule" exact element={<Schedule />} />
          <Route path="/appointment" exact element={<Appointment/>}/>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
