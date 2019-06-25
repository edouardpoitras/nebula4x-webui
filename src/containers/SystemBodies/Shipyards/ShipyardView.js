import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { fetchSystem } from '../../../redux/actions/systems/systemActions'
import ShipyardSummary from '../../../components/Body/Shipyards/ShipyardSummary'
import ShipyardActions from '../../../components/Body/Shipyards/ShipyardActions'
import ShipyardSlipways from '../../../components/Body/Shipyards/ShipyardSlipways'
import ShipyardBuildQueue from '../../../components/Body/Shipyards/ShipyardBuildQueue'
import ShipyardBuild from './ShipyardBuild'
import ShipyardRetool from './ShipyardRetool'
import ShipyardCapacity from './ShipyardCapacity'
import ShipyardSlipway from './ShipyardSlipway'

class ShipyardView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toBuild: false,
      toRetool: false,
      toCapacity: false,
      toSlipway: false
    }
    this.onBuildClick = this.onBuildClick.bind(this)
    this.onRetoolClick = this.onRetoolClick.bind(this)
    this.onCapacityClick = this.onCapacityClick.bind(this)
    this.onSlipwayClick = this.onSlipwayClick.bind(this)
    this.onBack = this.onBack.bind(this)
  }
  onBuildClick() {
    this.setState({toBuild: true})
  }
  onRetoolClick() {
    this.setState({toRetool: true})
  }
  onCapacityClick() {
    this.setState({toCapacity: true})
  }
  onSlipwayClick() {
    this.setState({toSlipway: true})
  }
  onBack() {
    this.setState({
      toBuild: false,
      toRetool: false,
      toCapacity: false,
      toSlipway: false
    })
  }
  render() {
    if (this.state.toBuild) {
      return <ShipyardBuild
        systemId={this.props.systemId}
        bodyId={this.props.bodyId}
        shipyard={this.props.shipyard}
        onBack={this.onBack}
        playerRace={this.props.playerRace}
      />
    } else if (this.state.toRetool) {
      return <ShipyardRetool
        systemId={this.props.systemId}
        bodyId={this.props.bodyId}
        shipyard={this.props.shipyard}
        onBack={this.onBack}
        playerRace={this.props.playerRace}
      />
    } else if (this.state.toCapacity) {
      return <ShipyardCapacity
        systemId={this.props.systemId}
        bodyId={this.props.bodyId}
        shipyard={this.props.shipyard}
        onBack={this.onBack}
        playerRace={this.props.playerRace}
      />
    } else if (this.state.toSlipway) {
      return <ShipyardSlipway
        systemId={this.props.systemId}
        bodyId={this.props.bodyId}
        shipyard={this.props.shipyard}
        onBack={this.onBack}
        playerRace={this.props.playerRace}
      />
    }
    return (
      <div className='shipyard-view'>
        <Row>
          <Col md={6}>
            <ShipyardSummary shipyard={this.props.shipyard} />
          </Col>
          <Col md={6}>
            <ShipyardActions
              shipyard={this.props.shipyard}
              onBuildClick={this.onBuildClick}
              onRetoolClick={this.onRetoolClick}
              onCapacityClick={this.onCapacityClick}
              onSlipwayClick={this.onSlipwayClick}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ShipyardSlipways shipyard={this.props.shipyard} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ShipyardBuildQueue shipyard={this.props.shipyard} />
          </Col>
        </Row>
      </div>
    )
  }
}

ShipyardView.propTypes = {
  shipyardId: PropTypes.number.isRequired,
  systemId: PropTypes.number.isRequired,
  bodyId: PropTypes.number.isRequired,
  shipyard: PropTypes.object.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  shipyard: state.systems[ownProps.systemId].ssBodies[ownProps.bodyId].bShipyards[ownProps.shipyardId]
})

export default connect(mapStateToProps, { fetchSystem })(ShipyardView)