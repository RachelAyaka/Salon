import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './index.css'
import Booking from './pages/Booking/Booking'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/booking" exact element={<Booking />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
