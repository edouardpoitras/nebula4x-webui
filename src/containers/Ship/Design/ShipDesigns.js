import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchShipDesigns, deleteShipDesign } from '../../../redux/actions/design/shipDesignActions'
import ShipDesignView from '../../../components/Ship/ShipDesignView'

class Ships extends React.Component {
  constructor(props) {
    super(props)
    if (!this.props.research ||
        !this.props.research[this.props.playerRace] ||
        !this.props.research[this.props.playerRace].rShipDesigns) {
      this.props.fetchShipDesigns()
    }
  }

  deleteShip(shipKey) {
    this.props.deleteShipDesign(shipKey)
    Alert.error('Ship Design Deleted')
  }

  render() {
    var shipDesignItems = []
    if (this.props.research[this.props.playerRace] && this.props.research[this.props.playerRace].rShipDesigns) {
      var ships = this.props.research[this.props.playerRace].rShipDesigns.unlocked
      shipDesignItems = Object.keys(ships).map(shipKey => (
        <div key={shipKey}>
          <Row>
            <Col md={12}>
              <ShipDesignView shipDesign={ships[shipKey]} handleDeleteClick={this.deleteShip.bind(this, shipKey)} />
            </Col>
          </Row>
        </div>
      ))
    }
    return (
      <div className="ships">
        <Grid fluid={true}>
          <Row>
            <Col md={10}>
              <h1>Ships</h1>
            </Col>
            <Col md={2}>
              <Link to="/design/ships/new">
                <Button bsStyle="primary">New Ship</Button>
              </Link>
            </Col>
          </Row>
          <hr />
          {shipDesignItems}
        </Grid>
      </div>
    )
  }
}

Ships.propTypes = {
  fetchShipDesigns: PropTypes.func.isRequired,
  deleteShipDesign: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired,
  research: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  research: state.research
})

export default connect(mapStateToProps, { fetchShipDesigns, deleteShipDesign })(Ships)