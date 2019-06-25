import { FETCH_SYSTEMS, FETCH_DISCOVERED_SYSTEMS, FETCH_SYSTEM_BODY, FETCH_SYSTEM_BODIES, FETCH_SYSTEMS_BODIES, FETCH_SYSTEMS_LIST, FETCH_SYSTEMS_WORMHOLES, FETCH_SYSTEM_SHIP, FETCH_SYSTEM } from '../types'
import Nebula4xGlobals from '../../../utils/globals'

const endpoint = Nebula4xGlobals._currentValue.apiEndpoint

export function fetchSystems() {
  return function(dispatch) {
    fetch(endpoint + '/api/systems')
      .then(res => res.json())
      .then(systems => dispatch({
        type: FETCH_SYSTEMS,
        payload: systems
      }))
  }
}

export function fetchDiscoveredSystems() {
  return function(dispatch) {
    fetch(endpoint + '/api/systems-discovered')
      .then(res => res.json())
      .then(systems => dispatch({
        type: FETCH_DISCOVERED_SYSTEMS,
        payload: systems
      }))
  }
}

export function fetchSystemsBodies() {
  return function(dispatch) {
    fetch(endpoint + '/api/systems-bodies')
      .then(res => res.json())
      .then(systems => dispatch({
        type: FETCH_SYSTEMS_BODIES,
        payload: systems
      }))
  }
}

export function fetchSystemBodies(systemId) {
  return function(dispatch) {
    fetch(endpoint + '/api/system-bodies/' + systemId)
      .then(res => res.json())
      .then(system => dispatch({
        type: FETCH_SYSTEM_BODIES,
        payload: system
      }))
  }
}

export function fetchSystemBody(systemId, bodyId) {
  return function(dispatch) {
    fetch(endpoint + '/api/system-body/' + systemId + '/' + bodyId)
      .then(res => res.json())
      .then(body => dispatch({
        type: FETCH_SYSTEM_BODY,
        payload: body
      }))
  }
}

export function fetchSystemsList() {
  return function(dispatch) {
    fetch(endpoint + '/api/systems-list')
      .then(res => res.json())
      .then(systems => dispatch({
        type: FETCH_SYSTEMS_LIST,
        payload: systems
      }))
  }
}

export function fetchSystemsWormholes() {
  return function(dispatch) {
    fetch(endpoint + '/api/systems-wormholes')
      .then(res => res.json())
      .then(systems => dispatch({
        type: FETCH_SYSTEMS_WORMHOLES,
        payload: systems
      }))
  }
}

export function fetchSystem(systemId) {
  return function(dispatch) {
    fetch(endpoint + '/api/systems/' + systemId)
      .then(res => res.json())
      .then(system => dispatch({
        type: FETCH_SYSTEM,
        payload: system
      }))
  }
}

export function fetchSystemShip(systemId, shipId) {
  return function(dispatch) {
    fetch(endpoint + '/api/systems/' + systemId + '/ship/' + shipId)
      .then(res => res.json())
      .then(ship => dispatch({
        type: FETCH_SYSTEM_SHIP,
        payload: ship
      }))
  }
}