import { FETCH_SYSTEMS, FETCH_SYSTEM_SHIP, FETCH_DISCOVERED_SYSTEMS, FETCH_SYSTEMS_LIST, FETCH_SYSTEM_BODY, FETCH_SYSTEM_BODIES, FETCH_SYSTEMS_BODIES, FETCH_SYSTEMS_WORMHOLES, FETCH_SYSTEM, FETCH_BODY_INSTALLMENTS, TOGGLE_SHIELDS, CREATE_SHIP_ORDER, UPDATE_SHIP_ORDER, DELETE_SHIP_ORDER, DELETE_SHIP_CONDITIONAL_ORDER } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var systemId = null
  var bodyId = null
  var shipId = null
  var system = null
  switch(action.type) {
  case FETCH_SYSTEMS:
    return action.payload
  case FETCH_SYSTEM_SHIP:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.ssrId
    shipId = action.payload.ssrShipId
    if (!(systemId in newState)) newState[systemId] = {}
    if (!('ssShips' in newState[systemId])) newState[systemId].ssShips = {}
    newState[systemId].ssShips[shipId] = action.payload.ssrShip
    return newState
  case FETCH_DISCOVERED_SYSTEMS:
    newState = JSON.parse(JSON.stringify(state))
    for (let systemId in action.payload) {
      system = action.payload[systemId]
      newState[system.ssId] = system
    }
    return newState
  case FETCH_SYSTEM_BODY:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.sbrId
    bodyId = action.payload.sbrBodyId
    if (!(systemId in newState)) newState[systemId] = {}
    if (!('ssBodies' in newState[systemId])) newState[systemId].ssBodies = {}
    newState[systemId].ssBodies[bodyId] = action.payload.sbrBody
    return newState
  case FETCH_SYSTEM_BODIES:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.sbsId
    if (!(systemId in newState)) newState[systemId] = {}
    newState[systemId].ssBodies = action.payload.sbsBodies
    return newState
  case FETCH_SYSTEMS_BODIES:
    newState = JSON.parse(JSON.stringify(state))
    for (let systemId in action.payload) {
      system = action.payload[systemId]
      if (newState[system.sbId]) {
        newState[system.sbId].ssDiscovered = system.sbDiscovered
        if (!newState[system.sbId].ssBodies) newState[system.sbId].ssBodies = {}
        for (let bid in action.payload[systemId].sbBodies) {
          var body = action.payload[systemId].sbBodies[bid]
          if (!newState[system.sbId].ssBodies[body.bsId]) newState[system.sbId].ssBodies[body.bsId] = {}
          newState[system.sbId].ssBodies[body.bsId].bId = body.bsId
          newState[system.sbId].ssBodies[body.bsId].bName = body.bsName
          newState[system.sbId].ssBodies[body.bsId].bRace = body.bsRace
        }
      }
    }
    return newState
  case FETCH_SYSTEMS_LIST:
    newState = JSON.parse(JSON.stringify(state))
    for (let systemId in action.payload) {
      system = action.payload[systemId]
      if (newState[system.siId]) {
        newState[system.siId].ssDiscovered = system.siDiscovered
        newState[system.siId].ssStar.starName = system.siName
      } else {
        newState[system.siId] = {
          ssDiscovered: system.siDiscovered,
          ssStar: { starName: system.siName }
        }
      }
    }
    return newState
  case FETCH_SYSTEMS_WORMHOLES:
    newState = JSON.parse(JSON.stringify(state))
    for (let systemId in action.payload) {
      system = action.payload[systemId]
      if (newState[system.swId]) {
        newState[system.swId].ssDiscovered = system.swDiscovered
        newState[system.swId].ssWormholes = system.swWormholes
        newState[system.swId].ssStar.starName = system.swName
      } else {
        newState[system.swId] = {
          ssWormholes: system.swWormholes,
          ssDiscovered: system.swDiscovered,
          ssStar: { starName: system.swName }
        }
      }
    }
    return newState
  case FETCH_SYSTEM:
    newState = JSON.parse(JSON.stringify(state))
    newState[action.payload.ssId] = action.payload
    return newState
  case FETCH_BODY_INSTALLMENTS:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.instSystemId
    bodyId = action.payload.instBodyId
    newState[systemId].ssBodies[bodyId].bInstallments = action.payload.instInstallments
    return newState
  case TOGGLE_SHIELDS:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.toggleShieldsResponseSystemId
    shipId = action.payload.toggleShieldsResponseShipId
    newState[systemId].ssShips[shipId] = action.payload.toggleShieldsResponseShip
    return newState
  case CREATE_SHIP_ORDER:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.createShipOrderResponseSystemId
    shipId = action.payload.createShipOrderResponseShipId
    newState[systemId].ssShips[shipId] = action.payload.createShipOrderResponseShip
    return newState
  case UPDATE_SHIP_ORDER:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.updateShipOrderResponseSystemId
    shipId = action.payload.updateShipOrderResponseShipId
    newState[systemId].ssShips[shipId] = action.payload.updateShipOrderResponseShip
    return newState
  case DELETE_SHIP_ORDER:
  case DELETE_SHIP_CONDITIONAL_ORDER:
    newState = JSON.parse(JSON.stringify(state))
    systemId = action.payload.deleteShipOrderResponseSystemId
    shipId = action.payload.deleteShipOrderResponseShipId
    newState[systemId].ssShips[shipId] = action.payload.deleteShipOrderResponseShip
    return newState
  default:
    return state
  }
}