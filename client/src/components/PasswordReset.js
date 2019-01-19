import React, { Component } from 'react'
import classnames from 'classnames'

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
    // ResetTokenCheck
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

export default PasswordReset
