import { FETCH_LASER_DESIGNS, RESEARCH_LASER_DESIGNS, FETCH_LASER_DESIGN, CREATE_LASER_DESIGN, DELETE_LASER_DESIGN } from '../types'
import { fetchRaceResearch } from '../research/researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchLasers(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/laser')
      .then(res => res.json())
      .then(lasers => dispatch({
        type: FETCH_LASER_DESIGNS,
        payload: lasers
      }))
      .then(callback)
  }
}

export function fetchLaser(laserDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/laser/' + laserDesignId)
      .then(res => res.json())
      .then(laser => dispatch({
        type: FETCH_LASER_DESIGN,
        payload: laser
      }))
  }
}

export function createLaser(focalSizeId, reducedSizeId, name) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/laser', {
      method: 'POST',
      body: JSON.stringify({
        laserFocalSize: parseInt(focalSizeId, 10),
        laserReducedSize: parseInt(reducedSizeId, 10),
        laserName: name
      })
    })
      .then(res => res.json())
      .then(laser => dispatch({
        type: CREATE_LASER_DESIGN,
        payload: laser
      }))
  }
}

export function researchLasers(systemId, bodyId, numLabs, researchId) {
  return function(dispatch) {
    var bodyPayload = {
      rrlSystemId: parseInt(systemId, 10),
      rrlBodyId: parseInt(bodyId, 10),
      rrlNumLabs: parseInt(numLabs, 10)
    }
    if (researchId) {
      bodyPayload.rrlResearchId = parseInt(researchId, 10)
    }
    fetch(endpoint + '/api/research/laser', {
      method: 'POST',
      body: JSON.stringify(bodyPayload)
    })
      .then(res => res.json())
      .then(research => {
        dispatch({
          type: RESEARCH_LASER_DESIGNS,
          payload: research 
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function deleteLaser(laserDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/laser', {
      method: 'DELETE',
      body: JSON.stringify({laserDesignId: parseInt(laserDesignId, 10)})
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_LASER_DESIGN,
        payload: result
      }))
      .then(fetchLasers())
  }
}

export function checkLaser(focalSizeId, reducedSizeId, callback) {
  fetch(endpoint + '/api/check/design/laser', {
    method: 'POST',
    body: JSON.stringify({
      checkLaserFocalSize: parseInt(focalSizeId, 10),
      checkLaserReducedSize: parseInt(reducedSizeId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}