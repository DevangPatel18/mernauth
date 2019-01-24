import React, { Component } from 'react'
import { Link } from 'gatsby'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator' // for React 15.x, use import { React15Tabulator }
import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'

// Marking event handler as 'passive' in response to console violations
require('default-passive-events')

// `async` wrapper to configure `localforage` and instantiate `axios` with `axios-cache-adapter`
async function configure() {
  // Register the custom `memoryDriver` to `localforage`
  await localforage.defineDriver(memoryDriver)

  // Create `localforage` instance
  const store = localforage.createInstance({
    // List of drivers used
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver,
    ],
    // Prefix all storage keys to prevent conflicts
    name: 'my-cache',
  })

  // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
  return setup({
    // `axios` options
    // baseURL: 'http://some-rest.api',

    // `axios-cache-adapter` options
    cache: {
      maxAge: 15 * 60 * 1000,
      store, // Pass `localforage` store to `axios-cache-adapter`
    },
  })
}

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
    configure().then(async api => {
      const nhlData = await api
        .get('/api/statistics')
        .then(res => res.data)
        .catch(err => {
          console.log(err)
        })

      this.setState({ stats: nhlData })
    })
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
