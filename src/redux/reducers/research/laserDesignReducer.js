import { FETCH_LASER_DESIGNS, RESEARCH_LASER_DESIGNS, FETCH_LASER_DESIGN, CREATE_LASER_DESIGN, DELETE_LASER_DESIGN } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  var ldId = 0
  switch(action.type) {
  case FETCH_LASER_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.laserDesignsRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserDesigns = action.payload.laserDesigns
    return newState
  case RESEARCH_LASER_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.rrlRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rLaserDesigns = action.payload.rrlLaserDesigns
    return newState
  case FETCH_LASER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.laserDesignRaceId
    if (!(raceId in newState)) newState[raceId] = {rLaserDesigns: {}}
    if (!('unlocked' in newState[raceId].rLaserDesigns)) newState[raceId].rLaserDesigns = {pending: null, locked: {}, unlocked: {}, researchLabs: {}}
    if (newState[raceId].rLaserDesigns.unlocked[action.payload.laserDesign.ldId]) {
      newState[raceId].rLaserDesigns.unlocked[action.payload.laserDesign.ldId] = action.payload.laserDesign
    } else if (newState[raceId].rLaserDesigns.locked[action.payload.laserDesign.ldId]) {
      newState[raceId].rLaserDesigns.locked[action.payload.laserDesign.ldId] = action.payload.laserDesign
    } else if (newState[raceId].rLaserDesigns.pending && newState[raceId].rLaserDesigns.pending.ldId === action.payload.laserDesign.ldId) {
      newState[raceId].rLaserDesigns.pending = action.payload.laserDesign
    }
    return newState
  case CREATE_LASER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.createdLaserDesignRaceId
    ldId = action.payload.createdLaserDesign.ldId
    if (state[raceId].rLaserDesigns.pending) {
      newState[raceId].rLaserDesigns.locked[ldId] = action.payload.createdLaserDesign
    } else {
      newState[raceId].rLaserDesigns.pending = action.payload.createdLaserDesign
    }
    return newState
  case DELETE_LASER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.deletedLaserDesignRaceId
    ldId = action.payload.deletedLaserDesignId
    if (newState[raceId].rLaserDesigns.unlocked[ldId]) {
      delete newState[raceId].rLaserDesigns.unlocked[ldId]
    } else if (newState[raceId].rLaserDesigns.locked[ldId]) {
      delete newState[raceId].rLaserDesigns.locked[ldId]
    } else if (newState[raceId].rLaserDesigns.pending && newState[raceId].rLaserDesigns.pending.ldId === ldId) {
      newState[raceId].rEngineDesigns.pending = null
    }
    return newState
  default:
    return state
  }
}