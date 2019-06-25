import React from 'react'
import PropTypes from 'prop-types'
import { prettyNumber, getAvailableOrders } from '../../utils/helpers'

class ShipOrderView extends React.Component {
  render() {
    var currentOrder = 'None'
    var orderAttributes = []
    var availableOrders = getAvailableOrders()
    if (this.props.order) {
      var orderName = availableOrders ? availableOrders[this.props.order.tag].name : this.props.order.tag
      var orderFields = Object.keys(this.props.order)
      for (let orderFieldId in orderFields) {
        var orderField = orderFields[orderFieldId]
        var value = this.props.order[orderField]
        if (orderField.includes('Progress')) {
          if (orderField.includes('InProgress')) {
            orderAttributes.push('In Progress = ' + value)
          } else {
            orderAttributes.push('Progress = ' + (value * 100).toLocaleString())
          }
        } else if (orderField.includes('moX')) {
          orderAttributes.push('X = ' + prettyNumber(value))
        } else if (orderField.includes('moY')) {
          orderAttributes.push('Y = ' + prettyNumber(value))
        } else if (orderField.includes('Amount')) {
          orderAttributes.push('Amount = ' + prettyNumber(value))
        } else if (orderField.includes('BodyId')) {
          if (this.props.systems && this.props.systems[this.props.systemId]) {
            orderAttributes.push('Body = ' + this.props.systems[this.props.systemId].ssBodies[value].bName)
          } else {
            orderAttributes.push('Body = ' + value)
          }
        } else if (orderField.includes('ShipId')) {
          if (this.props.systems && this.props.systems[this.props.systemId]) {
            orderAttributes.push('Ship = ' + this.props.systems[this.props.systemId].ssShips[value].sName)
          } else {
            orderAttributes.push('Ship = ' + value)
          }
        } else if (orderField.includes('WormholeId')) {
          if (!value) {
            orderAttributes.push('Wormhole = None')
          } else if (this.props.systems && this.props.systems[this.props.systemId]) {
            if (this.props.systems[this.props.systemId].ssWormholes[value]) {
              var wormhole = this.props.systems[this.props.systemId].ssWormholes[value]
              var starId = wormhole.wDestinationStarId
              if (starId && wormhole.wSurveyed) {
                orderAttributes.push('Wormhole = ' + this.props.systems[starId].ssStar.starName)
              } else {
                orderAttributes.push('Wormhole = ' + ('' + value).substring(0, 3))
              }
            } else {
              orderAttributes.push('Recovering from jump shock')
            }
          } else {
            orderAttributes.push('Wormhole = ' + value.substring(0, 3))
          }
        } else if (orderField.includes('Installment')) {
          orderAttributes.push('Installment = ' + value.iName)
        } else if (orderField.includes('Minerals')) {
          orderAttributes.push('Minerals = ' + value.minsElement)
          orderAttributes.push('Amount = ' + prettyNumber(value.minsCount) + ' kg')
        } else if (orderField.includes('Arrived')) {
          orderAttributes.push('Arrived = ' + value)
        }
      }
      if (orderAttributes.length > 0) {
        if (this.props.justAttributes) {
          currentOrder = orderAttributes.join(', ')
        } else {
          currentOrder = orderName + ' (' + orderAttributes.join(', ') + ')'
        }
      } else {
        currentOrder = orderName
      }
    }
    return currentOrder
  }
}

ShipOrderView.propTypes = {
  order: PropTypes.object,
  systems: PropTypes.object,
  systemId: PropTypes.number,
  justAttributes: PropTypes.bool
}

export default ShipOrderView