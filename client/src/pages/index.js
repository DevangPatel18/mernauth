import React from 'react'
// import { Link } from 'gatsby'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import Layout from '../components/layout'
// import Image from '../components/image'
import SEO from '../components/seo'
import Landing from '../components/Landing'
import { Router } from '@reach/router'
import Register from '../components/Register'
import Login from '../components/login'
import Dashboard from '../components/dashboard'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Router>
      <Landing path="/" />
      <Register path="/register" />
      <Login path="/login" />
      <Dashboard path="/dashboard" />
    </Router>
    <span className="material-icons" />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
  </Layout>
)

export default IndexPage
