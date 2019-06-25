import { FETCH_MISSLE_LAUNCHER_DESIGNS, RESEARCH_MISSLE_LAUNCHER_DESIGNS, FETCH_MISSLE_LAUNCHER_DESIGN, CREATE_MISSLE_LAUNCHER_DESIGN, DELETE_MISSLE_LAUNCHER_DESIGN } from '../../actions/types'

export default function(state = {}, action) {
  var newState = {}
  var raceId = 0
  var mldId = 0
  switch(action.type) {
  case FETCH_MISSLE_LAUNCHER_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.missleLauncherDesignsRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMissleLauncherDesigns = action.payload.missleLauncherDesigns
    return newState
  case RESEARCH_MISSLE_LAUNCHER_DESIGNS:
    newState = Object.assign({}, state)
    raceId = action.payload.rrmlRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMissleLauncherDesigns = action.payload.rrmlMissleLauncherDesigns
    return newState
  case FETCH_MISSLE_LAUNCHER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.missleLauncherDesignRaceId
    if (!(raceId in newState)) newState[raceId] = {rMissleLauncherDesigns: {}}
    if (!('unlocked' in newState[raceId].rMissleLauncherDesigns)) newState[raceId].rMissleLauncherDesigns = {pending: null, locked: {}, unlocked: {}, researchLabs: {}}
    if (newState[raceId].rMissleLauncherDesigns.unlocked[action.payload.missleLauncherDesign.mldId]) {
      newState[raceId].rMissleLauncherDesigns.unlocked[action.payload.missleLauncherDesign.mldId] = action.payload.missleLauncherDesign
    } else if (newState[raceId].rMissleLauncherDesigns.locked[action.payload.missleLauncherDesign.mldId]) {
      newState[raceId].rMissleLauncherDesigns.locked[action.payload.missleLauncherDesign.mldId] = action.payload.missleLauncherDesign
    } else if (newState[raceId].rMissleLauncherDesigns.pending && newState[raceId].rMissleLauncherDesigns.pending.mldId === action.payload.missleLauncherDesign.mldId) {
      newState[raceId].rMissleLauncherDesigns.pending = action.payload.missleLauncherDesign
    }
    return newState
  case CREATE_MISSLE_LAUNCHER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.createdMissleLauncherDesignRaceId
    mldId = action.payload.createdMissleLauncherDesign.mldId
    if (state[raceId].rMissleLauncherDesigns.pending) {
      newState[raceId].rMissleLauncherDesigns.locked[mldId] = action.payload.createdMissleLauncherDesign
    } else {
      newState[raceId].rMissleLauncherDesigns.pending = action.payload.createdMissleLauncherDesign
    }
    return newState
  case DELETE_MISSLE_LAUNCHER_DESIGN:
    newState = Object.assign({}, state)
    raceId = action.payload.deletedMissleLauncherDesignRaceId
    mldId = action.payload.deletedMissleLauncherDesignId
    if (newState[raceId].rMissleLauncherDesigns.unlocked[mldId]) {
      delete newState[raceId].rMissleLauncherDesigns.unlocked[mldId]
    } else if (newState[raceId].rMissleLauncherDesigns.locked[mldId]) {
      delete newState[raceId].rMissleLauncherDesigns.locked[mldId]
    } else if (newState[raceId].rMissleLauncherDesigns.pending && newState[raceId].rMissleLauncherDesigns.pending.mldId === mldId) {
      newState[raceId].rEngineDesigns.pending = null
    }
    return newState
  default:
    return state
  }
}