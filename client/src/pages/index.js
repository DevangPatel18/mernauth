import React from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Landing from '../components/Landing'
import { Router } from '@reach/router'
import { navigate } from 'gatsby'
import Register from '../components/Register'
import Login from '../components/login'
import Dashboard from '../components/dashboard'
import PrivateRoute from '../components/PrivateRoute'

import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { setCurrentUser, logoutUser } from '../actions/authActions'
import store from '../store'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    navigate(`/login`)
  }
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Landing path="/" />
      <Register path="/register" />
      <Login path="/login" />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Router>
    <span className="material-icons" />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
  </Layout>
)

export default IndexPage
