import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap'

class EngineView extends React.Component {
  render() {
    const engineDesign = this.props.engineDesign
    const engine = engineDesign.edEngine
    const engineType = engine.eType.split('Engine')[0]
    const researchProgress = engineDesign.edResearchProgress * 100
    const fuelEfficiency = engine.eEfficiency
    const hourlyFuelEfficiency = engine.eRating * fuelEfficiency
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            <Row>
              <Col sm={10}>
                {engine.eName}
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
              <span><strong>Size:</strong> {engine.eSize.toLocaleString()} tons</span><br />
              <span><strong>Power:</strong> {engine.eRating.toLocaleString()}</span><br />
              <span><strong>Class:</strong> {engineType}</span>
            </Col>
            <Col md={6}>
              <span><strong>Fuel Efficiency:</strong> {engine.eEfficiency.toFixed(1).toLocaleString() + ' Litres / Hour'}</span><br />
              <span><strong>Fuel Power Efficiency:</strong> {hourlyFuelEfficiency.toFixed(1).toLocaleString() + ' Litres / Power / Hour'}</span><br />
              <span><strong>Development Cost:</strong> {engineDesign.edResearchCost.toLocaleString() + ' RP (' + researchProgress.toFixed(1) + '%)'}</span><br />
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

EngineView.propTypes = {
  engineDesign: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default EngineView