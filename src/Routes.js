import React, { lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginForm from './pages/Login/LoginForm'


const SignupForm = lazy(()=>import('../src/pages/Signup/Signup'))

const PageRoutes = () => {
  return (
    <Routes >
        {/* <Route path="/" element={<LoginForm/>}/> */}
    </Routes>
  )
}

export default PageRoutes
