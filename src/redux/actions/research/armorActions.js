import { FETCH_ARMOR, RESEARCH_ARMOR } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchArmor(callback) {
  return function (dispatch) {
    fetch(endpoint + '/api/research/armor')
      .then(res => res.json())
      .then(armor => dispatch({
        type: FETCH_ARMOR,
        payload: armor
      }))
      .then(callback)
  }
}

export function researchArmor(systemId, bodyId, numLabs) {
  return function (dispatch) {
    fetch(endpoint + '/api/research/armor', {
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
          type: RESEARCH_ARMOR,
          payload: research
        })
        // TODO: This doesn't need to be done because the research payload above has the changed armor values.
        // Need to fix this and apply to all other research endopints.
        dispatch(fetchRaceResearch())
      })
  }
}