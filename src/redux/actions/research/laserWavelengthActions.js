import { FETCH_LASER_DESIGN_WAVELENGTHS, RESEARCH_LASER_DESIGN_WAVELENGTHS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchLaserWavelengths(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-wavelength')
      .then(res => res.json())
      .then(wavelengths => dispatch({
        type: FETCH_LASER_DESIGN_WAVELENGTHS,
        payload: wavelengths
      }))
      .then(callback)
  }
}

export function researchLaserWavelengths(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/laser-wavelength', {
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
          type: RESEARCH_LASER_DESIGN_WAVELENGTHS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}