import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

class FavItems extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Create a favorite list here!
            </h4>
            <p className="flow-text grey-text text-darken-1">
              
            </p>
            <br />
            <Link
              to="/dashboard"
              style={{
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Back to Dashboard
            </Link>
            {/* <Link
              to="/login"
              style={{
                marginLeft: '2rem',
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </Link> */}
          </div>
        </div>
      </div>
    )
  }
}

export default FavItems
