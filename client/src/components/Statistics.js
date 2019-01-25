import React, { Component } from 'react'
import { Link } from 'gatsby'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator' // for React 15.x, use import { React15Tabulator }
import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'
import { FormControl, InputLabel, Input, NativeSelect } from '@material-ui/core'

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
  { title: 'Name', field: 'playerName', width: 200, frozen: true },
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
      yearStart: '20182019',
      yearEnd: '20182019',
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { yearStart } = this.state
    const yearCutoff = parseInt(yearStart.slice(0, 4), 10)
    let optionsStart = []
    let optionsEnd = []

    for (let i = 1917; i < 2019; i++) {
      optionsStart.push(
        <option value={`${i}${i + 1}`} key={`${i}-start`}>{`${i}-${i +
          1}`}</option>
      )
    }

    for (let i = yearCutoff; i < 2019; i++) {
      optionsEnd.push(
        <option value={`${i}${i + 1}`} key={`${i}-end`}>{`${i}-${i +
          1}`}</option>
      )
    }

    return (
      <div style={{ fontFamily: 'Arial' }}>
        <h4>Player Statistics</h4>
        <div className="row valign-wrapper">
          <div
            style={{
              paddingRight: '1rem',
              fontWeight: 'boldest',
              height: '100%',
            }}
          >
            Season Range
          </div>
          <FormControl>
            <InputLabel htmlFor="yearStart" />
            <NativeSelect
              value={this.state.yearStart}
              onChange={this.handleChange('yearStart')}
              input={<Input name="yearStart" id="yearStart" />}
            >
              {optionsStart.map(option => option)}
            </NativeSelect>
          </FormControl>
          <span style={{ padding: '0 1rem' }}> to </span>
          <FormControl>
            <InputLabel htmlFor="yearEnd" />
            <NativeSelect
              value={this.state.yearEnd}
              onChange={this.handleChange('yearEnd')}
              input={<Input name="yearEnd" id="yearEnd" />}
            >
              {optionsEnd.map(option => option)}
            </NativeSelect>
          </FormControl>
        </div>
        <div className="row">
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            generate data
            <i className="material-icons right" />
          </button>
        </div>
        <ReactTabulator
          columns={columns}
          data={this.state.stats}
          options={{
            pagination: 'local',
            paginationSize: 20,
            layout: 'fitDataFill',
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
