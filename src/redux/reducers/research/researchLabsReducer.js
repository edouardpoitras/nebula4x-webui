import { FETCH_RESEARCH_LABS, RESEARCH_RESEARCH_LABS } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_RESEARCH_LABS:
  case RESEARCH_RESEARCH_LABS:
    var newState = Object.assign({}, state)
    var raceId = action.payload.irRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rResearchLabs = action.payload.irInstallment
    return newState
  default:
    return state
  }
}