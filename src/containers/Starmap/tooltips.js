import { fabric } from 'fabric'
import { getZoom, textConstantScale } from './utils'
import { prettyNumber } from '../../utils/helpers'
import { getBottomRightLocation } from './canvas'

var objectTooltip = null

/**
 * Draw a tooltip near specified object.
 */
function drawTooltip(props, canvas, object, systems) {
  if (object.objectType === 'star') drawStarTooltip(props, canvas, object)
  else if (object.objectType === 'body') drawBodyTooltip(props, canvas, object)
  else if (object.objectType === 'packet') drawPacketTooltip(props, canvas, object)
  else if (object.objectType === 'ship') drawShipTooltip(props, canvas, object)
  else if (object.objectType === 'wormhole') drawWormholeTooltip(props, canvas, object, systems)
}

/**
 * Draw a simple info tooltip near the star.
 */
function drawStarTooltip(props, canvas, object) {
  var mass = object.metadata.starMass
  var massText = prettyNumber(mass) + ' kg'
  var radius = object.metadata.starRadius
  var radiusText = prettyNumber(radius) + ' km'
  var text = 'Name: ' + object.metadata.starName +
             '\nMass: ' + massText +
             '\nRadius: ' + radiusText
  var zoom = getZoom(props)
  objectTooltip = new fabric.Text(text, {
    backgroundColor: 'white',
    opacity: 0.7,
    selectable: false,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    styles: {}
  })
  var bottomRight = getBottomRightLocation(props, canvas)
  objectTooltip.left = bottomRight[0] - (objectTooltip.width / zoom) / 2 - (130 / zoom)
  objectTooltip.top = bottomRight[1] - (objectTooltip.height / zoom) / 2 - (25 / zoom)
  canvas.add(objectTooltip)
}

/**
 * Draw a simple info tooltip near the body.
 */
function drawBodyTooltip(props, canvas, object) {
  var mass = object.metadata.bMass
  var massText = prettyNumber(mass) + ' kg'
  var radius = object.metadata.bRadius
  var radiusText = prettyNumber(radius) + ' km'
  var orbit = object.metadata.bOrbitalDistance
  var orbitText = prettyNumber((orbit.rangeMin + orbit.rangeMax) / 2) + ' km'
  var fuelReserves = object.metadata.bFuelReserves
  var fuelReservesText = ''
  if (fuelReserves > 0) {
    fuelReservesText = '\nFuel Reserves: ' + prettyNumber(fuelReserves) + ' L'
  }
  var unavailableMinerals = 0
  var availableMinerals = 0
  Object.keys(object.metadata.bMinerals).map(function(minKey) {
    unavailableMinerals += object.metadata.bMinerals[minKey].mCount
    availableMinerals += object.metadata.bMinerals[minKey].mStockpile
    return null
  })
  var race = object.metadata.bRace
  var unavailableMineralsText = 'No Survey'
  if (object.metadata.bSurveys && object.metadata.bSurveys[race] && object.metadata.bSurveys[race].bsSurveyed) {
    unavailableMineralsText = prettyNumber(unavailableMinerals) + ' kg'
  } else if (object.metadata.bSurveys && object.metadata.bSurveys[race] && object.metadata.bSurveys[race].bsProgress) {
    unavailableMineralsText = 'Surveying - ' + Math.round(object.metadata.bSurveys[race].bsProgress * 100) + '%'
  }
  var mineralsText = '\nMinerals: ' + unavailableMineralsText
  if (availableMinerals > 0) {
    mineralsText += ' (' + prettyNumber(availableMinerals) + ' kg)'
  }
  var shipyardsText = ''
  var numShipyards = Object.keys(object.metadata.bShipyards).length
  if (numShipyards > 0) {
    shipyardsText = '\nShipyards: ' + numShipyards
  }
  var text = 'Name: ' + object.metadata.bName +
             '\nType: ' + object.metadata.bType +
             '\nMass: ' + massText +
             '\nRadius: ' + radiusText +
             '\nAverage Orbit Distance: ' + orbitText +
             shipyardsText + mineralsText + fuelReservesText
  if (object.metadata.bGasGiant) {
    text += '\nGas Giant'
  }
  var zoom = getZoom(props)
  objectTooltip = new fabric.Text(text, {
    backgroundColor: 'white',
    opacity: 0.7,
    selectable: false,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    styles: {}
  })
  var bottomRight = getBottomRightLocation(props, canvas)
  objectTooltip.left = bottomRight[0] - (objectTooltip.width / zoom) / 2 - (120 / zoom)
  objectTooltip.top = bottomRight[1] - (objectTooltip.height / zoom) / 2 - (70 / zoom)
  canvas.add(objectTooltip)
}

/**
 * Draw a simple info tooltip near a mineral packet.
 */
function drawPacketTooltip(props, canvas, object) {
  var mineralsText = ''
  Object.keys(object.metadata.mpMineralStacks).map(function(element) {
    mineralsText += element + ' - ' + object.metadata.mpMineralStacks[element].minsCount.toFixed(2).toLocaleString() + ' tons\n'
    return null
  })
  var text = 'Mineral Packet' +
             '\nSpeed: ' + object.metadata.mpSpeed.toLocaleString() + ' km/s' +
             '\nMinerals:\n' + mineralsText
  var zoom = getZoom(props)
  objectTooltip = new fabric.Text(text, {
    backgroundColor: 'white',
    opacity: 0.7,
    selectable: false,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    styles: {}
  })
  var bottomRight = getBottomRightLocation(props, canvas)
  objectTooltip.left = bottomRight[0] - (objectTooltip.width / zoom) / 2 - (65 / zoom)
  objectTooltip.top = bottomRight[1] - (objectTooltip.height / zoom) / 2 - (100 / zoom)
  canvas.add(objectTooltip)
}

/**
 * Draw a simple info tooltip near a ship.
 */
function drawShipTooltip(props, canvas, object) {
  var text = 'Name: ' + object.metadata.sName +
             '\nFuel: ' + object.metadata.sFuel.toLocaleString() + ' L'
  if (object.metadata.sCurrentConditionalOrder) {
    text += '\nCurrent Order: ' + object.metadata.sCurrentConditionalOrder.scoOrder.tag
  } else if (object.metadata.sCurrentOrder) {
    if (object.metadata.sCurrentOrder.tag === 'TransitJumpGateOrder' && object.metadata.sCurrentOrder.tjgoCooldown > 0) {
      text += '\nCurrent Order: Recovering from jump shock (' + object.metadata.sCurrentOrder.tjgoCooldown + 's)'
    } else {
      text += '\nCurrent Order: ' + object.metadata.sCurrentOrder.tag
    }
  } else {
    text += '\nCurrent Order: None'
  }
  text += '\nDesign: ' + object.metadata.sDesign.sdName
  var zoom = getZoom(props)
  objectTooltip = new fabric.Text(text, {
    backgroundColor: 'white',
    opacity: 0.7,
    selectable: false,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    styles: {}
  })
  var bottomRight = getBottomRightLocation(props, canvas)
  objectTooltip.left = bottomRight[0] - (objectTooltip.width / zoom) / 2 - (140 / zoom)
  objectTooltip.top = bottomRight[1] - (objectTooltip.height / zoom) / 2 - (35 / zoom)
  canvas.add(objectTooltip)
}

/**
 * Draw a simple info tooltip near a wormhole.
 */
function drawWormholeTooltip(props, canvas, object, systems) {
  var wormholeData = object.metadata
  var description = 'Gravitational Anomaly ' + ('' + wormholeData.wId).substring(0, 3)
  var progress = ''
  if (wormholeData.wSurveyed && wormholeData.wDestinationStarId && wormholeData.wJumpGate) {
    description = 'Jump Gate to ' + systems[wormholeData.wDestinationStarId].ssStar.starName
  } else if (wormholeData.wSurveyed && wormholeData.wDestinationStarId) {
    description = 'Wormhole to ' + systems[wormholeData.wDestinationStarId].ssStar.starName
    progress = '\nBuild Progress: ' + Math.round(wormholeData.wJumpGateProgress * 100) + '%'
  } else {
    progress = '\nSurvey Progress: ' + Math.round(wormholeData.wSurveyProgress * 100) + '%'
  }
  var text = description + progress
  var zoom = getZoom(props)
  objectTooltip = new fabric.Text(text, {
    backgroundColor: 'white',
    opacity: 0.7,
    selectable: false,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    styles: {}
  })
  var bottomRight = getBottomRightLocation(props, canvas)
  objectTooltip.left = bottomRight[0] - (objectTooltip.width / zoom) / 2 - (80 / zoom)
  objectTooltip.top = bottomRight[1] - (objectTooltip.height / zoom) / 2 - (20 / zoom)
  canvas.add(objectTooltip)
}

/**
 * Clear the object tooltip.
 */
function clearTooltip(canvas) {
  canvas.remove(objectTooltip)
  objectTooltip = null
}

export { drawTooltip, drawBodyTooltip, drawShipTooltip, drawStarTooltip, drawWormholeTooltip, clearTooltip }