import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap'
import { prettyNumber } from '../../utils/helpers'

class LaserView extends React.Component {
  render() {
    const laserDesign = this.props.laserDesign
    const laser = laserDesign.ldLaser
    const researchProgress = laserDesign.ldResearchProgress * 100
    const secondsToFire = 1 / laser.lRechargeRate
    const attacksPerMinute = 60 / secondsToFire
    const attacksPerHour = attacksPerMinute * 60
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Row>
              <Col sm={10}>
                {laser.lName}
              </Col>
              <Col sm={2} className="text-right">
                <Button onClick={this.props.handleDeleteClick}>
                  <Glyphicon glyph="trash" />
                </Button>
              </Col>
            </Row>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            <Col md={6}>
              <span><strong>Size:</strong> {prettyNumber(laser.lSize)} tons</span><br />
              <span><strong>Damage:</strong> {laser.lDamage.toLocaleString()}</span><br />
              <span><strong>Rate of Fire:</strong> {attacksPerMinute.toFixed(2).toLocaleString() + '/min (' + prettyNumber(attacksPerHour) + '/hr)'}</span><br />
            </Col>
            <Col md={6}>
              <span><strong>Range:</strong> {prettyNumber(laser.lRange) + ' km'}</span><br />
              <span><strong>Development Cost:</strong> {laserDesign.ldResearchCost.toLocaleString() + ' RP (' + researchProgress.toFixed(1) + '%)'}</span><br />
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

LaserView.propTypes = {
  laserDesign: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default LaserView