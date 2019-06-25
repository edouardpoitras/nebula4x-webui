import React from 'react'
import { Well, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { prettyNumber } from '../../utils/helpers'

class LaserDesignCheck extends React.Component {
  render() {
    var laserDesign = this.props.designCheck
    var laser = laserDesign.ldLaser
    var secondsToFire = 1 / laser.lRechargeRate
    var attacksPerMinute = 60 / secondsToFire
    var attacksPerHour = attacksPerMinute * 60
    return (
      <Well>
        <Row>
          <Col lg={6}>
            <span><strong>Size:</strong> {prettyNumber(laser.lSize)} tons</span><br />
            <span><strong>Damage:</strong> {laser.lDamage.toLocaleString()}</span><br />
            <span><strong>Rate of Fire:</strong> {attacksPerMinute.toFixed(2).toLocaleString() + '/min (' + prettyNumber(attacksPerHour) + '/hr)'}</span><br />
          </Col>
          <Col lg={6}>
            <span><strong>Range:</strong> {prettyNumber(laser.lRange) + ' km'}</span><br />
            <span><strong>Development Cost:</strong> {laserDesign.ldResearchCost.toLocaleString() + ' RP'}</span><br />
          </Col>
        </Row>
      </Well>
    )
  }
}

LaserDesignCheck.propTypes = {
  designCheck: PropTypes.object.isRequired
}

export default LaserDesignCheck