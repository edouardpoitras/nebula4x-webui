import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Button, Glyphicon } from 'react-bootstrap'
import { deleteShipConditionalOrder } from '../../../redux/actions/ship/shipActions'
import ShipOrderView from '../../../components/Ship/ShipOrderView'
import ShipConditionalOrderView from '../../../components/Ship/ShipConditionalOrderView'
import ShipNewConditionalOrder from './ShipNewConditionalOrder'

class ShipConditionalOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toNewOrder: false
    }
    this.deleteOrderClicked = this.deleteOrderClicked.bind(this)
    this.onNewOrderClicked = this.onNewOrderClicked.bind(this)
    this.onBack = this.onBack.bind(this)
  }
  deleteOrderClicked(event) {
    var id = null
    if (event.target.id) {
      id = event.target.id
    } else {
      id = event.target.parentNode.id
    }
    this.props.deleteShipConditionalOrder(this.props.systemId, this.props.ship.sId, id)
  }
  onNewOrderClicked() {
    this.setState({toNewOrder: true})
  }
  onBack() {
    this.setState({
      toNewOrder: false
    })
  }
  render() {
    if (this.state.toNewOrder) {
      return <ShipNewConditionalOrder
        systems={this.props.systems}
        systemId={this.props.systemId}
        ship={this.props.ship}
        groupId={this.state.groupId}
        onBack={this.onBack} />
    }
    var conditionalOrderTableRows = [<tr key={0}><td>None</td></tr>]
    if (this.props.ship.sConditionalOrders.length > 0) {
      conditionalOrderTableRows = []
      this.props.ship.sConditionalOrders.map(function(conditionalOrder, conditionalOrderIdx) {
        var condition = conditionalOrder.scoCondition
        var conditionDetails = <ShipConditionalOrderView condition={condition} systems={this.props.systems} systemId={this.props.systemId} justAttributes={false} />
        var order = conditionalOrder.scoOrder
        var orderDetails = <ShipOrderView order={order} systems={this.props.systems} systemId={this.props.systemId} justAttributes={false} />
        var orderDeleteAction = (
          <Button onClick={this.deleteOrderClicked} id={conditionalOrderIdx}>
            <Glyphicon glyph="trash" />
          </Button>
        )
        conditionalOrderTableRows.push(
          <tr key={conditionalOrderIdx}>
            <td>{conditionalOrderIdx + 1}</td>
            <td>{conditionDetails}</td>
            <td>{orderDetails}</td>
            <td>{orderDeleteAction}</td>
          </tr>
        )
        return null
      }.bind(this))
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Condition</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {conditionalOrderTableRows}
          </tbody>
        </Table>
        <Button key='new-conditional-order' bsStyle="primary" onClick={this.onNewOrderClicked}>New Conditional Order</Button>
      </div>
    )
  }
}

ShipConditionalOrders.propTypes = {
  ship: PropTypes.object.isRequired,
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number.isRequired,
  deleteShipConditionalOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  systems: state.systems,
  ship: state.systems[ownProps.systemId].ssShips[ownProps.ship.sId]
})

export default connect(mapStateToProps, { deleteShipConditionalOrder })(ShipConditionalOrders)