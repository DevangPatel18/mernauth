import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

class FavItems extends Component {
  constructor() {
    super()
    this.state = {
      favItems: [],
    }
  }

  async componentDidMount() {
    const { user } = this.props.auth
    const response = await axios.get(`/api/items/itemlist/${user.id}`)
    this.setState({ favItems: response.data })
  }
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>Create a favorite list here!</h4>
            <p className="flow-text grey-text text-darken-1" />
            <br />
            <ul className="collection">
              {this.state.favItems.map((items, i) => (
                <li className="collection-item" key={i}>
                  {items}
                </li>
              ))}
            </ul>
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

// FavItems.propTypes = {
//   // user: PropTypes.object.isRequired,
// }

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(FavItems)
// export default FavItems
