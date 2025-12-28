import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<h1>User Register</h1>} />
            <Route path="/user/login" element={<h1>User Login</h1>} />
            <Route path="/foodpartner/register" element={<h1>FoodPartner Register</h1>} />
            <Route path="/foodpartner/login" element={<h1>FoodPartner Login</h1>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes