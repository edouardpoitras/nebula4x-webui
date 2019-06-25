import { FETCH_SHIP_DESIGNS, FETCH_SHIP_DESIGN, CREATE_SHIP_DESIGN, DELETE_SHIP_DESIGN } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  var sdId = 0
  switch(action.type) {
  case FETCH_SHIP_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.shipDesignsRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rShipDesigns = action.payload.shipDesigns
    return newState
  case FETCH_SHIP_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.shipDesignRaceId
    if (!(raceId in newState)) newState[raceId] = {rShipDesigns: {}}
    if (!('unlocked' in newState[raceId].rShipDesigns)) newState[raceId].rShipDesigns = {pending: null, locked: {}, unlocked: {}, researchLabs: {}}
    sdId = action.payload.shipDesign.sdId
    newState[raceId].rShipDesigns.unlocked[sdId] = action.payload.shipDesign
    return newState
  case CREATE_SHIP_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.createdShipDesignRaceId
    sdId = action.payload.createdShipDesign.sdId
    newState[raceId].rShipDesigns.unlocked[sdId] = action.payload.createdShipDesign
    return newState
  case DELETE_SHIP_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.deleteShipDesignRaceId
    sdId = action.payload.deleteShipDesignId
    if (raceId in newState &&
        'rShipDesigns' in newState[raceId] &&
        'unlocked' in newState[raceId].rShipDesigns &&
        sdId in newState[raceId].rShipDesigns.unlocked) {
      delete newState[raceId].rShipDesigns.unlocked[sdId]
    }
    return newState
  default:
    return state
  }
}