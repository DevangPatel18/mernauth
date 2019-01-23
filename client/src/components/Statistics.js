import React, { Component } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator' // for React 15.x, use import { React15Tabulator }

// Marking event handler as 'passive' in response to console violations
require('default-passive-events')

const columns = [
  { title: 'Name', field: 'playerName', width: 200 },
  { title: 'G', field: 'goals' },
  { title: 'A', field: 'assists' },
  { title: 'P', field: 'points' },
  { title: 'Height', field: 'playerHeight' },
  { title: 'GP', field: 'gamesPlayed' },
  { title: 'Country', field: 'playerBirthCountry' },
  { title: 'DOB', field: 'playerBirthDate' },
  { title: 'Draft #', field: 'playerDraftOverallPickNo' },
  { title: 'Draft Year', field: 'playerDraftYear' },
  { title: 'Pos', field: 'playerPositionCode' },
  { title: 'Weight', field: 'playerWeight' },
  { title: '+/-', field: 'plusMinus' },
  { title: 'P/G', field: 'pointsPerGame' },
  { title: 'PPG', field: 'ppGoals' },
  { title: 'PPP', field: 'ppGoals' },
  { title: 'SHG', field: 'shGoals' },
  { title: 'SHP', field: 'shPoints' },
  { title: 'Shifts/G', field: 'shPoints' },
  { title: 'S%', field: 'shootingPctg' },
  { title: 'TOI/G', field: 'timeOnIcePerGame' },
]

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

    this.setState({ stats: nhlData })
  }

  render() {
    return (
      <div>
        <h4>Stats go here!</h4>
        <p className="flow-text grey-text text-darken-1" />
        <ReactTabulator
          style={{ margin: '2rem' }}
          columns={columns}
          data={this.state.stats}
          options={{
            pagination: 'local',
            paginationSize: 20,
          }}
        />
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
    )
  }
}

export default Statistics
