import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div>
          <div>
            <h4>
              <b>Build</b> a login/auth app with the MERN stack from scratch
            </h4>
            <p>
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
            <a
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
            >
              Register
            </a>
            <a
              style={{
                marginLeft: '2rem',
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
