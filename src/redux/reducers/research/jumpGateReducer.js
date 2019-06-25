import { FETCH_JUMP_GATE_MODULES, RESEARCH_JUMP_GATES } from '../../actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_JUMP_GATE_MODULES:
  case RESEARCH_JUMP_GATES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.jgrRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rJumpGate = action.payload.jgrJumpGate
    return newState
  default:
    return state
  }
}