import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import { fetchLasers } from '../../redux/actions/design/laserDesignActions'

class LaserDesignSelect extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchLasers()
    this.handleChange = this.handleChange.bind(this)
    this.getSelect = this.getSelect.bind(this)
  }
  handleChange(selectedOption) {
    this.props.onChange(selectedOption)
  }
  getSelect() {
    var laserResearch = this.props.research[this.props.playerRace].rLaserDesigns
    // React-Select wouldn't work here for some unknown reason.
    var lockedAndPending = Object.assign({}, laserResearch.locked)
    var value = 0
    if (laserResearch.pending) {
      lockedAndPending[laserResearch.pending.ldId] = laserResearch.pending
      value = laserResearch.pending.ldId
    }
    var options = []
    Object.keys(lockedAndPending).map(function(designKey) {
      var design = lockedAndPending[designKey]
      var cost = Math.round(design.ldResearchCost)
      var percent = Math.round(design.ldResearchProgress * 100)
      options.push(<option key={design.ldId} value={design.ldId}>{design.ldLaser.lName} ({cost} RP - {percent}%)</option>)
      return null
    })
    if (options.length < 1) {
      options.push(<option key={0} value={0}>No Designs Available</option>)
    }
    return <FormControl value={value} onChange={this.handleChange} componentClass="select">{options}</FormControl>
  }
  render() {
    return this.getSelect()
  }
}

LaserDesignSelect.propTypes = {
  research: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetchLasers: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchLasers })(LaserDesignSelect)