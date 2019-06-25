import {
  FETCH_MINES, RESEARCH_MINES,
  FETCH_RESEARCH_LABS, RESEARCH_RESEARCH_LABS,
  FETCH_FUEL_REFINERIES, RESEARCH_FUEL_REFINERIES,
  FETCH_CONSTRUCTION_FACTORIES, RESEARCH_CONSTRUCTION_FACTORIES,
  FETCH_MASS_DRIVERS, RESEARCH_MASS_DRIVERS } from '../types'
import { fetchRaceResearch } from './researchActions'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function researchMines(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/mines', {
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
          type: RESEARCH_MINES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function fetchMines(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/mines')
      .then(res => res.json())
      .then(mines => dispatch({
        type: FETCH_MINES,
        payload: mines
      }))
      .then(callback)
  }
}

export function researchResearchLabs(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/research-labs', {
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
          type: RESEARCH_RESEARCH_LABS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function fetchResearchLabs(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/research-labs')
      .then(res => res.json())
      .then(labs => dispatch({
        type: FETCH_RESEARCH_LABS,
        payload: labs
      }))
      .then(callback)
  }
}

export function researchFuelRefineries(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/fuel-refineries', {
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
          type: RESEARCH_FUEL_REFINERIES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function fetchFuelRefineries(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/fuel-refineries')
      .then(res => res.json())
      .then(refineries => dispatch({
        type: FETCH_FUEL_REFINERIES,
        payload: refineries
      }))
      .then(callback)
  }
}

export function researchConstructionFactories(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/construction-factories', {
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
          type: RESEARCH_CONSTRUCTION_FACTORIES,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function fetchConstructionFactories(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/construction-factories')
      .then(res => res.json())
      .then(factories => dispatch({
        type: FETCH_CONSTRUCTION_FACTORIES,
        payload: factories
      }))
      .then(callback)
  }
}

export function researchMassDrivers(systemId, bodyId, numLabs) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/mass-drivers', {
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
          type: RESEARCH_MASS_DRIVERS,
          payload: research
        })
        dispatch(fetchRaceResearch())
      })
  }
}

export function fetchMassDrivers(callback) {
  return function(dispatch) {
    fetch(endpoint + '/api/research/mass-drivers')
      .then(res => res.json())
      .then(massDrivers => dispatch({
        type: FETCH_MASS_DRIVERS,
        payload: massDrivers 
      }))
      .then(callback)
  }
}