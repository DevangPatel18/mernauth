import React, { Component } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { tokenCheck } from '../actions/authActions'

class PasswordReset extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
      password2: '',
      errors: {},
    }
  }

  async componentDidMount() {
    // Run action creator that checks for valid reset token
    this.props.tokenCheck(this.props.resetToken)
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      navigate('/dashboard') // push user to dashboard when they access password reset page
    }
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  updatePassword = e => {
    e.preventDefault()
    // Run action creator that validates password
    // PasswordReset
  }

  render() {
    const { errors } = this.state

    if (errors.message)
      return <span className="red-text">{errors.message}</span>

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Reset</b> Password
              </h4>
            </div>
            <form noValidate onSubmit={this.updatePassword}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  autoComplete=""
                  className={classnames('', {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  autoComplete=""
                  className={classnames('', {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PasswordReset.propTypes = {
  tokenCheck: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { tokenCheck }
)(PasswordReset)
