import React from 'react'
import { Well, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

class EngineDesignCheck extends React.Component {
  render() {
    var engineDesign = this.props.designCheck
    var hourlyFuelEfficiency = engineDesign.edEngine.eRating * engineDesign.edEngine.eEfficiency
    var engine = engineDesign.edEngine
    return (
      <Well>
        <Row>
          <Col lg={6}>
            <span><strong>Size:</strong> {engine.eSize.toLocaleString()} tons</span><br />
            <span><strong>Power:</strong> {engine.eRating.toLocaleString()}</span><br />
            <span><strong>Class:</strong> {engine.eType.replace('Engine', '')}</span>
          </Col>
          <Col lg={6}>
            <span><strong>Fuel Efficiency:</strong> {engine.eEfficiency.toFixed(1).toLocaleString() + ' Litres / Hour'}</span><br />
            <span><strong>Fuel Power Efficiency:</strong> {hourlyFuelEfficiency.toFixed(1).toLocaleString() + ' Litres / Power / Hour'}</span><br />
            <span><strong>Development Cost:</strong> {engineDesign.edResearchCost.toLocaleString()}</span><br />
          </Col>
        </Row>
      </Well>
    )
  }
}

EngineDesignCheck.propTypes = {
  designCheck: PropTypes.object.isRequired
}

export default EngineDesignCheck