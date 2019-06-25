import React from 'react'
import PropTypes from 'prop-types'

class ShipyardSummary extends React.Component {
  render() {
    var shipyard = this.props.shipyard
    var task = shipyard.syCurrentTask
    var taskType = ''
    var taskProgress = ''
    var taskDescription = ''
    if (!task) {
      taskDescription = 'None'
    } else if (task.tag === 'ShipyardRetool') {
      taskType = 'Retooling (' + task.srShipDesign.sdName + ')'
      taskProgress = Math.round(task.srProgress * 100) + '%'
      taskDescription = taskType + ' - ' + taskProgress
    } else if (task.tag === 'ShipyardAddCapacity') {
      var capacityAmount = task.sacTargetCapacity - task.sacStartingCapacity
      var capPercentDone = (shipyard.syCapacity - task.sacStartingCapacity) / (task.sacTargetCapacity - task.sacStartingCapacity)
      taskType = 'Adding Capacity (' + Math.round(capacityAmount).toLocaleString() + ')'
      taskProgress = Math.round(capPercentDone * 100) + '%'
      taskDescription = taskType + ' - ' + taskProgress
    } else if (task.tag === 'ShipyardAddSlipway') {
      taskType = 'Adding Slipway'
      taskProgress = Math.round(task.sasProgress * 100) + '%'
      taskDescription = taskType + ' - ' + taskProgress
    }
    var name = this.props.shipyard.syName
    var type = this.props.shipyard.syType.split('Shipyard')[0]
    var capacity = Math.round(this.props.shipyard.syCapacity).toLocaleString()
    var design = this.props.shipyard.syShipDesign ? this.props.shipyard.syShipDesign.sdName : 'None'
    return (
      <div className='shipyard-summary'>
        <span><strong>Name:</strong> {name}</span><br />
        <span><strong>Type:</strong> {type}</span><br />
        <span><strong>Capacity:</strong> {capacity}</span><br />
        <span><strong>Design:</strong> {design}</span><br />
        <span><strong>Current Task:</strong> {taskDescription}</span>
      </div>
    )
  }
}

ShipyardSummary.propTypes = {
  shipyard: PropTypes.object.isRequired
}

export default ShipyardSummary