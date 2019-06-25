import React from 'react'
import { Well, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { prettyNumber } from '../../utils/helpers'

class MissleLauncherDesignCheck extends React.Component {
  render() {
    var missleLauncherDesign = this.props.designCheck
    var missleLauncher = missleLauncherDesign.mldMissleLauncher
    var secondsToFire = 1 / missleLauncher.mlReloadRate
    var roundPerMinute = 60 / secondsToFire
    var roundPerHour = roundPerMinute * 60
    return (
      <Well>
        <Row>
          <Col lg={6}>
            <span><strong>Size:</strong> {prettyNumber(missleLauncher.mlSize)} tons</span><br />
            <span><strong>Missle Strength:</strong> {missleLauncher.mlMissle.missStrength.toLocaleString()}</span><br />
            <span><strong>Rate of Fire:</strong> {roundPerMinute.toFixed(2).toLocaleString() + '/min (' + prettyNumber(roundPerHour) + '/hr)'}</span><br />
          </Col>
          <Col lg={6}>
            <span><strong>Missle Speed:</strong> {prettyNumber(missleLauncher.mlMissle.missSpeed) + ' km/s'}</span><br />
            <span><strong>Missle Range:</strong> {prettyNumber(missleLauncher.mlMissle.missRange) + ' km'}</span><br />
            <span><strong>Development Cost:</strong> {missleLauncherDesign.mldResearchCost.toLocaleString() + ' RP'}</span><br />
          </Col>
        </Row>
      </Well>
    )
  }
}

MissleLauncherDesignCheck.propTypes = {
  designCheck: PropTypes.object.isRequired
}

export default MissleLauncherDesignCheck