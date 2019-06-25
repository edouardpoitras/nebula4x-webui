import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchSystemsList } from '../../redux/actions/systems/systemActions'

class StarmapMenu extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchSystemsList()
  }
  render() {
    var menuItems = []
    Object.keys(this.props.systems).map(function(systemKey) {
      var system = this.props.systems[systemKey]
      if ((this.props.onlyDiscoveredBy && system.ssDiscovered && system.ssDiscovered[this.props.onlyDiscoveredBy]) || !this.props.onlyDiscoveredBy) {
        menuItems.push(<li key={systemKey}><Link onClick={this.props.onClick} to={'/starmap/' + systemKey}>{system.ssStar.starName}</Link></li>)
      }
      return null
    }.bind(this))
    return menuItems
  }
}

StarmapMenu.propTypes = {
  fetchSystemsList: PropTypes.func.isRequired,
  systems: PropTypes.object,
  onlyDiscoveredBy: PropTypes.number,
  onClick: PropTypes.func
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default connect (mapStateToProps, { fetchSystemsList })(StarmapMenu)