import React from 'react'
import PropTypes from 'prop-types'

class ShipyardBuildQueue extends React.Component {
  render() {
    var buildQueue = this.props.shipyard.syBuildQueue
    var queue = buildQueue.map(function(item, index) {
      return <li key={index}>{item}</li>
    })
    if (queue.length < 1) {
      queue = 'None'
    } else {
      queue = <ul>{queue}</ul>
    }
    return (
      <div className='shipyard-build-queue'>
        <strong>Build Queue:</strong><br />
        {queue}
      </div>
    )
  }
}

ShipyardBuildQueue.propTypes = {
  shipyard: PropTypes.object.isRequired
}

export default ShipyardBuildQueue