import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Button, Glyphicon } from 'react-bootstrap'
import { updateShipOrder, deleteShipOrder } from '../../../redux/actions/ship/shipActions'
import ShipNewOrder from './ShipNewOrder'
import ShipOrderView from '../../../components/Ship/ShipOrderView'
import { getAvailableOrders } from '../../../utils/helpers'

class ShipOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableOrders: getAvailableOrders(),
      toNewOrder: false,
      groupId: null,
    }
    this.addToGroupClicked = this.addToGroupClicked.bind(this)
    this.updateGroupClicked = this.updateGroupClicked.bind(this)
    this.deleteOrderClicked = this.deleteOrderClicked.bind(this)
    this.deleteGroupClicked = this.deleteGroupClicked.bind(this)
    this.onNewOrderClicked = this.onNewOrderClicked.bind(this)
    this.onBack = this.onBack.bind(this)
  }
  addToGroupClicked(event) {
    var id = null
    if (event.target.id) {
      id = event.target.id
    } else {
      id = event.target.parentNode.id
    }
    this.setState({toNewOrder: true, groupId: id})
  }
  updateGroupClicked(event) {
    var id = null
    if (event.target.id) {
      id = event.target.id
    } else {
      id = event.target.parentNode.id
    }
    var action = id.split('-')
    var orderGroupId = action[1]
    var repeatValue = this.props.ship.sOrderGroups[orderGroupId].sogRepeat
    if (action[0] === 'plus') {
      repeatValue += 1
    } else if (action[0] === 'plus2') {
      repeatValue += 10
    } else if (action[0] === 'minus') {
      repeatValue -= 1
    } else if (action[0] === 'minus2') {
      repeatValue -= 10
    }
    if (repeatValue < 1) {
      repeatValue = 1
    }
    this.props.updateShipOrder(this.props.systemId, this.props.ship.sId, orderGroupId, repeatValue)
  }
  deleteOrderClicked(event) {
    var id = null
    if (event.target.id) {
      id = event.target.id
    } else {
      id = event.target.parentNode.id
    }
    var ids = id.split('-')
    this.props.deleteShipOrder(this.props.systemId, this.props.ship.sId, ids[0], ids[1])
  }
  deleteGroupClicked(event) {
    var id = null
    if (event.target.id) {
      id = event.target.id
    } else {
      id = event.target.parentNode.id
    }
    this.props.deleteShipOrder(this.props.systemId, this.props.ship.sId, id)
  }
  onNewOrderClicked() {
    this.setState({toNewOrder: true, groupId: null})
  }
  onBack() {
    this.setState({
      toNewOrder: false
    })
  }
  render() {
    if (this.state.toNewOrder) {
      return <ShipNewOrder
        systems={this.props.systems}
        systemId={this.props.systemId}
        ship={this.props.ship}
        groupId={this.state.groupId}
        onBack={this.onBack}
        availableOrders={this.state.availableOrders}>
      </ShipNewOrder>
    }
    var groupTableRows = [<tr key={0}><td>None</td></tr>]
    if (this.props.ship.sOrderGroups.length > 0) {
      groupTableRows = []
      this.props.ship.sOrderGroups.map(function(orderGroup, orderGroupIdx) {
        var repeatLeft = orderGroup.sogRepeat
        var orderTableRows = []
        orderGroup.sogOrders.map(function(order, orderIdx) {
          var name = order.tag
          var details = <ShipOrderView order={order} systems={this.props.systems} systemId={this.props.systemId} justAttributes={true} />
          var orderDeleteAction = (
            <Button onClick={this.deleteOrderClicked} id={orderGroupIdx + '-' + orderIdx}>
              <Glyphicon glyph="trash" />
            </Button>
          )
          orderTableRows.push(
            <tr key={orderIdx}>
              <td>{this.state.availableOrders[name].name}</td>
              <td>{details}</td>
              <td>{orderDeleteAction}</td>
            </tr>
          )
          return null
        }.bind(this))
        var orderTable = (
          <Table>
            <tbody>
              {orderTableRows}
            </tbody>
          </Table>
        )
        var groupRepeatAction = (
          <div>
            <span>{repeatLeft}x  </span>
            <Button onClick={this.updateGroupClicked} id={'plus-' + orderGroupIdx}>
              <Glyphicon glyph="plus" />
            </Button>
            <Button onClick={this.updateGroupClicked} id={'plus2-' + orderGroupIdx}>
              <Glyphicon glyph="plus" />
              <Glyphicon glyph="plus" />
            </Button>
            <Button onClick={this.updateGroupClicked} id={'minus-' + orderGroupIdx}>
              <Glyphicon glyph="minus" />
            </Button>
            <Button onClick={this.updateGroupClicked} id={'minus2-' + orderGroupIdx}>
              <Glyphicon glyph="minus" />
              <Glyphicon glyph="minus" />
            </Button>
          </div>
        )
        var groupAddAction = (
          <Button onClick={this.addToGroupClicked} id={orderGroupIdx}>
            <Glyphicon glyph="plus" />
          </Button>
        )
        var groupDeleteAction = (
          <Button onClick={this.deleteGroupClicked} id={orderGroupIdx}>
            <Glyphicon glyph="trash" />
          </Button>
        )
        groupTableRows.push(
          <tr key={orderGroupIdx}>
            <td>{orderGroupIdx + 1}</td>
            <td>{orderTable}</td>
            <td>{groupRepeatAction}</td>
            <td>{groupAddAction} {groupDeleteAction}</td>
          </tr>
        )
      }.bind(this))
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Orders</th>
              <th>Repeat</th>
              <th>Group Action</th>
            </tr>
          </thead>
          <tbody>
            {groupTableRows}
          </tbody>
        </Table>
        <Button key='new-order' bsStyle="primary" onClick={this.onNewOrderClicked}>New Order</Button>
      </div>
    )
  }
}

ShipOrders.propTypes = {
  ship: PropTypes.object.isRequired,
  systems: PropTypes.object.isRequired,
  systemId: PropTypes.number.isRequired,
  updateShipOrder: PropTypes.func.isRequired,
  deleteShipOrder: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  systems: state.systems,
  ship: state.systems[ownProps.systemId].ssShips[ownProps.ship.sId]
})

export default connect(mapStateToProps, { updateShipOrder, deleteShipOrder })(ShipOrders)