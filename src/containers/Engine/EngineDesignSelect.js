import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import { fetchEngines } from '../../redux/actions/design/engineDesignActions'

class EngineDesignSelect extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchEngines()
    this.handleChange = this.handleChange.bind(this)
    this.getSelect = this.getSelect.bind(this)
  }
  handleChange(selectedOption) {
    this.props.onChange(selectedOption)
  }
  getSelect() {
    // React-Select wouldn't work here for some unknown reason.
    var lockedAndPending = Object.assign({}, this.props.research[this.props.playerRace].rEngineDesigns.locked)
    var value = 0
    if (this.props.research[this.props.playerRace].rEngineDesigns.pending) {
      lockedAndPending[this.props.research[this.props.playerRace].rEngineDesigns.pending.edId] = this.props.research[this.props.playerRace].rEngineDesigns.pending
      value = this.props.research[this.props.playerRace].rEngineDesigns.pending.edId
    }
    var options = []
    Object.keys(lockedAndPending).map(function(designKey) {
      var design = lockedAndPending[designKey]
      var cost = Math.round(design.edResearchCost)
      var percent = Math.round(design.edResearchProgress * 100)
      options.push(<option key={design.edId} value={design.edId}>{design.edEngine.eName} ({cost} RP - {percent}%)</option>)
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

EngineDesignSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  fetchEngines: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchEngines })(EngineDesignSelect)