import { FETCH_MINES, RESEARCH_MINES } from '../../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_MINES:
  case RESEARCH_MINES:
    var newState = Object.assign({}, state)
    var raceId = action.payload.irRaceId
    if (!(raceId in newState)) newState[raceId] = {}
    newState[raceId].rMines = action.payload.irInstallment
    return newState
  default:
    return state
  }
}