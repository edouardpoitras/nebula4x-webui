import { FETCH_MISSLE_LAUNCHER_DESIGNS, RESEARCH_MISSLE_LAUNCHER_DESIGNS, FETCH_MISSLE_LAUNCHER_DESIGN, CREATE_MISSLE_LAUNCHER_DESIGN, DELETE_MISSLE_LAUNCHER_DESIGN } from '../types'
import { fetchRaceResearch } from '../research/researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchMissleLaunchers(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/missle-launcher')
      .then(res => res.json())
      .then(launchers => dispatch({
        type: FETCH_MISSLE_LAUNCHER_DESIGNS,
        payload: launchers
      }))
      .then(callback)
  }
}

export function fetchMissleLauncher(missleLauncherDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/missle-launcher/' + missleLauncherDesignId)
      .then(res => res.json())
      .then(launcher => dispatch({
        type: FETCH_MISSLE_LAUNCHER_DESIGN,
        payload: launcher
      }))
  }
}

export function createMissleLauncher(sizeId, reducedSizeId, name) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/missle-launcher', {
      method: 'POST',
      body: JSON.stringify({
        missleLauncherSize: parseInt(sizeId, 10),
        missleLauncherReducedSize: parseInt(reducedSizeId, 10),
        missleLauncherName: name
      })
    })
      .then(res => res.json())
      .then(launcher => dispatch({
        type: CREATE_MISSLE_LAUNCHER_DESIGN,
        payload: launcher
      }))
  }
}

export function researchMissleLaunchers(systemId, bodyId, numLabs, researchId) {
  return function(dispatch) {
    var bodyPayload = {
      rrmlSystemId: parseInt(systemId, 10),
      rrmlBodyId: parseInt(bodyId, 10),
      rrmlNumLabs: parseInt(numLabs, 10)
    }
    if (researchId) {
      bodyPayload.rrmlResearchId = parseInt(researchId, 10)
    }
    fetch(endpoint + '/api/research/missle-launcher', {
      method: 'POST',
      body: JSON.stringify(bodyPayload)
    })
      .then(res => res.json())
      .then(research => {
        dispatch({
          type: RESEARCH_MISSLE_LAUNCHER_DESIGNS,
          payload: research 
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function deleteMissleLauncher(missleLauncherDesignId) {
  return function(dispatch) {
    fetch(endpoint + '/api/design/missle-launcher', {
      method: 'DELETE',
      body: JSON.stringify({missleLauncherDesignId: parseInt(missleLauncherDesignId, 10)})
    })
      .then(res => res.json())
      .then(result => dispatch({
        type: DELETE_MISSLE_LAUNCHER_DESIGN,
        payload: result
      }))
      .then(fetchMissleLaunchers())
  }
}

export function checkMissleLauncher(sizeId, reducedSizeId, callback) {
  fetch(endpoint + '/api/check/design/missle-launcher', {
    method: 'POST',
    body: JSON.stringify({
      checkMissleLauncherSize: parseInt(sizeId, 10),
      checkMissleLauncherReducedSize: parseInt(reducedSizeId, 10)
    })})
    .then(res => res.json())
    .then(callback)
}