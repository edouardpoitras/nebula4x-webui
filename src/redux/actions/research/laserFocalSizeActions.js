import { FETCH_LASER_DESIGN_FOCAL_SIZES, RESEARCH_LASER_DESIGN_FOCAL_SIZES } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchLaserFocalSizes(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-focal-size')
      .then(res => res.json())
      .then(sizes => dispatch({
        type: FETCH_LASER_DESIGN_FOCAL_SIZES,
        payload: sizes
      }))
      .then(callback)
  }
}

export function researchLaserFocalSizes(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-focal-size', {
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
          type: RESEARCH_LASER_DESIGN_FOCAL_SIZES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}