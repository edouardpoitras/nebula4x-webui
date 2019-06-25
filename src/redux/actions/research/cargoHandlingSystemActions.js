import { FETCH_CARGO_HANDLING_SYSTEMS, RESEARCH_CARGO_HANDLING_SYSTEMS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchCargoHandlingSystems(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/cargo-handling-systems')
      .then(res => res.json())
      .then(cargoHandlingSystems => dispatch({
        type: FETCH_CARGO_HANDLING_SYSTEMS,
        payload: cargoHandlingSystems
      }))
      .then(callback)
  }
}

export function researchCargoHandlingSystems(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/cargo-handling-systems', {
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
          type: RESEARCH_CARGO_HANDLING_SYSTEMS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}