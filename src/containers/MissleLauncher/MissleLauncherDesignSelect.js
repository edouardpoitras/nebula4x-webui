import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import { fetchMissleLaunchers } from '../../redux/actions/design/missleLauncherDesignActions'

class MissleLauncherDesignSelect extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchMissleLaunchers()
    this.handleChange = this.handleChange.bind(this)
    this.getSelect = this.getSelect.bind(this)
  }
  handleChange(selectedOption) {
    this.props.onChange(selectedOption)
  }
  getSelect() {
    var missleLauncherResearch = this.props.research[this.props.playerRace].rMissleLauncherDesigns
    // React-Select wouldn't work here for some unknown reason.
    var lockedAndPending = Object.assign({}, missleLauncherResearch.locked)
    var value = 0
    if (missleLauncherResearch.pending) {
      lockedAndPending[missleLauncherResearch.pending.mldId] = missleLauncherResearch.pending
      value = missleLauncherResearch.pending.mldId
    }
    var options = []
    Object.keys(lockedAndPending).map(function(designKey) {
      var design = lockedAndPending[designKey]
      var cost = Math.round(design.mldResearchCost)
      var percent = Math.round(design.mldResearchProgress * 100)
      options.push(<option key={design.mldId} value={design.mldId}>{design.mldMissleLauncher.mlName} ({cost} RP - {percent}%)</option>)
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

MissleLauncherDesignSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  fetchMissleLaunchers: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchMissleLaunchers })(MissleLauncherDesignSelect)