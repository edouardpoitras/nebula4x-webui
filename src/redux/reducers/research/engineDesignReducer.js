import { FETCH_ENGINE_DESIGNS, RESEARCH_ENGINE_DESIGNS, FETCH_ENGINE_DESIGN, CREATE_ENGINE_DESIGN, DELETE_ENGINE_DESIGN } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  var edId = 0
  switch(action.type) {
  case FETCH_ENGINE_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.engineDesignsRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rEngineDesigns = action.payload.engineDesigns
    return newState
  case RESEARCH_ENGINE_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.rreRaceId
    if (!(raceId in newState)) newState[raceId] = {rEngineDesigns: {}}
    newState[raceId].rEngineDesigns = action.payload.rreEngineDesigns
    return newState
  case FETCH_ENGINE_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.engineDesignRaceId
    if (!(raceId in newState)) newState[raceId] = {rEngineDesigns: {}}
    if (!('unlocked' in newState[raceId].rEngineDesigns)) newState[raceId].rEngineDesigns = {pending: null, locked: {}, unlocked: {}, researchLabs: {}}
    if (newState[raceId].rEngineDesigns.unlocked[action.payload.engineDesign.edId]) {
      newState[raceId].rEngineDesigns.unlocked[action.payload.engineDesign.edId] = action.payload.engineDesign
    } else if (newState[raceId].rEngineDesigns.locked[action.payload.engineDesign.edId]) {
      newState[raceId].rEngineDesigns.locked[action.payload.engineDesign.edId] = action.payload.engineDesign
    } else if (newState[raceId].rEngineDesigns.pending && newState[raceId].rEngineDesigns.pending.edId === action.payload.engineDesign.edId) {
      newState[raceId].rEngineDesigns.pending = action.payload.engineDesign
    }
    return newState
  case CREATE_ENGINE_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.createdEngineDesignRaceId
    edId = action.payload.createdEngineDesign.edId
    if (!newState[raceId].rEngineDesigns) newState[raceId].rEngineDesigns = {}
    if (newState[raceId].rEngineDesigns.pending) {
      newState[raceId].rEngineDesigns.locked[edId] = action.payload.createdEngineDesign
    } else {
      newState[raceId].rEngineDesigns.pending = action.payload.createdEngineDesign
    }
    return newState
  case DELETE_ENGINE_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.deletedEngineDesignRaceId
    edId = action.payload.deletedEngineDesignId
    if (newState[raceId].rEngineDesigns.unlocked[edId]) {
      delete newState[raceId].rEngineDesigns.unlocked[edId]
    } else if (newState[raceId].rEngineDesigns.locked[edId]) {
      delete newState[raceId].rEngineDesigns.locked[edId]
    } else if (newState[raceId].rEngineDesigns.pending && newState[raceId].rEngineDesigns.pending.edId === edId) {
      newState[raceId].rEngineDesigns.pending = null
    }
    return newState
  default:
    return state
  }
}