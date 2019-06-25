import { CREATE_SHIP_ORDER, UPDATE_SHIP_ORDER, DELETE_SHIP_ORDER, DELETE_SHIP_CONDITIONAL_ORDER, TOGGLE_SHIELDS } from '../types'
import { fetchSystem } from '../systems/systemActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function createShipOrder(systemId, shipId, orderData, groupId) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/order', {
      method: 'POST',
      body: JSON.stringify({
        createShipOrderSystemId: parseInt(systemId, 10),
        createShipOrderShipId: parseInt(shipId, 10),
        createShipOrderGroupId: groupId ? parseInt(groupId, 10) : null,
        createShipOrder: orderData
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: CREATE_SHIP_ORDER,
        payload: result
      }))
  }
}

export function createShipConditionalOrder(systemId, shipId, conditionData, orderData) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/conditional-order', {
      method: 'POST',
      body: JSON.stringify({
        createShipConditionalOrderSystemId: parseInt(systemId, 10),
        createShipConditionalOrderShipId: parseInt(shipId, 10),
        createShipConditionalOrderCondition: conditionData,
        createShipConditionalOrder: orderData
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: CREATE_SHIP_ORDER,
        payload: result
      }))
  }
}

export function updateShipOrder(systemId, shipId, groupId, repeatValue) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/order/update', {
      method: 'POST',
      body: JSON.stringify({
        updateShipOrderSystemId: parseInt(systemId, 10),
        updateShipOrderShipId: parseInt(shipId, 10),
        updateShipOrderGroupId: parseInt(groupId, 10),
        updateShipOrderRepeat: repeatValue
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: UPDATE_SHIP_ORDER,
        payload: result
      }))
  }
}

export function deleteShipOrder(systemId, shipId, groupId, orderId) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/order', {
      method: 'DELETE',
      body: JSON.stringify({
        deleteShipOrderSystemId: parseInt(systemId, 10),
        deleteShipOrderShipId: parseInt(shipId, 10),
        deleteShipOrderGroupId: parseInt(groupId, 10),
        deleteShipOrderId: orderId ? parseInt(orderId, 10) : null
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_SHIP_ORDER,
        payload: result
      }))
  }
}

export function deleteShipConditionalOrder(systemId, shipId, conditionalOrderId) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/conditional-order', {
      method: 'DELETE',
      body: JSON.stringify({
        deleteShipConditionalOrderSystemId: parseInt(systemId, 10),
        deleteShipConditionalOrderShipId: parseInt(shipId, 10),
        deleteShipConditionalOrderId: parseInt(conditionalOrderId, 10)
      })
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_SHIP_CONDITIONAL_ORDER,
        payload: result
      }))
  }
}

export function toggleShields(systemId, shipId) {
  return function(dispatch) {
    fetch(endpoint + '/api/ship/toggle-shields', {
      method: 'POST',
      body: JSON.stringify({
        toggleShieldsSystemId: parseInt(systemId, 10),
        toggleShieldsShipId: parseInt(shipId, 10)
      })
    })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: TOGGLE_SHIELDS,
          payload: result
        })
        // This should be fetchShip(systemId, shipId) instead.
        dispatch(fetchSystem(systemId))
      })
  }
}