import { combineReducers } from 'redux'
import time from './time/timeReducer'
import grid from './grid/gridReducer'
import starmaps from './starmap/starmapReducer'
import systems from './system/systemsReducer'
import races from './race/racesReducer'
import research from './research/researchReducer'
import production from './production/productionReducer'
import installments from './installments/installmentReducer'

export default combineReducers({
  universeTime: time,
  grid: grid,
  starmaps: starmaps,
  races: races,
  systems: systems,
  research: research,
  production: production,
  installments: installments
})