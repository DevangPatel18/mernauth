import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navigate, Redirect } from '@reach/router'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (!auth.isAuthenticated) {
    navigate(`./login`)
    // return null;
    return <Redirect to="login" noThrow/>;
  }

  return <Component {...rest} props={auth} />
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
