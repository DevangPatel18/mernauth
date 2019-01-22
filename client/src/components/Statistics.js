import React, { Component } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'

class Statistics extends Component {
  constructor() {
    super()
    this.state = {
      stats: [],
    }
  }

  async componentDidMount() {
    let nhlData = await axios
      .get('/api/statistics')
      .then(res => res.data)
      .catch(err => {
        console.log(err)
      })

    console.log(nhlData.slice(0, 5))
  }

  render() {
    // console.log(this.state.stats);

    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>Stats go here!</h4>
            <p className="flow-text grey-text text-darken-1" />
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
          </div>
        </div>
      </div>
    )
  }
}

export default Statistics
