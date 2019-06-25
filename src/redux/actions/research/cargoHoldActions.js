import { FETCH_CARGO_HOLDS, RESEARCH_CARGO_HOLDS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchCargoHolds(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/cargo-holds')
      .then(res => res.json())
      .then(cargoHolds=> dispatch({
        type: FETCH_CARGO_HOLDS,
        payload: cargoHolds
      }))
      .then(callback)
  }
}

export function researchCargoHolds(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/cargo-holds', {
      method: 'POST',
      body: JSON.stringify({
        rrSystemId: parseInt(systemId, 10),
        rrBodyId: parseInt(bodyId, 10),
        rrNumLabs: parseInt(numLabs, 10)
      })
    })
      .then(res => res.json())
      .then(research => {
        dispatch({
          type: RESEARCH_CARGO_HOLDS,
          payload: research 
        })
        dispatch(fetchRaceResearch())
      })
  }
}