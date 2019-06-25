import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap'
import { prettyNumber } from '../../utils/helpers'

class MissleLauncherView extends React.Component {
  render() {
    const missleLauncherDesign = this.props.missleLauncherDesign
    const missleLauncher = missleLauncherDesign.mldMissleLauncher
    const researchProgress = missleLauncherDesign.mldResearchProgress * 100
    const secondsToFire = 1 / missleLauncher.mlReloadRate
    const roundPerMinute = 60 / secondsToFire
    const roundPerHour = roundPerMinute * 60
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Row>
              <Col sm={10}>
                {missleLauncher.mlName}
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
              <span><strong>Size:</strong> {prettyNumber(missleLauncher.mlSize)} tons</span><br />
              <span><strong>Missle Strength:</strong> {missleLauncher.mlMissle.missStrength.toLocaleString()}</span><br />
              <span><strong>Rate of Fire:</strong> {roundPerMinute.toFixed(2).toLocaleString() + '/min (' + prettyNumber(roundPerHour) + '/hr)'}</span><br />
            </Col>
            <Col md={6}>
              <span><strong>Missle Speed:</strong> {prettyNumber(missleLauncher.mlMissle.missSpeed)}</span><br />
              <span><strong>Missle Range:</strong> {prettyNumber(missleLauncher.mlMissle.missRange)}</span><br />
              <span><strong>Development Cost:</strong> {missleLauncherDesign.mldResearchCost.toLocaleString() + ' RP (' + researchProgress.toFixed(1) + '%)'}</span><br />
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

MissleLauncherView.propTypes = {
  missleLauncherDesign: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default MissleLauncherView