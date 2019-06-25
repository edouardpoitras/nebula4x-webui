import { fabric } from 'fabric'
import { starColor } from './star'
import { shipColor } from './ships'
import { bodyColor, moonColor, cometColor, asteroidColor } from './bodies'
import { getZoom, getSystem } from './utils'

var tickerSize = [6, 7]

/**
 * Helper function to remove all canvas body tickers.
 */
function clearTickers(canvas) {
  canvas.forEachObject(function(object, index, objects) {
    // Not sure why we need to re-loop objects here instead of just deleting object.
    objects.map(function(obj) {
      if (obj !== undefined && obj.get('type') === 'triangle') {
        canvas.remove(obj)
      }
      return null
    })
  })
}

/**
 * Helper function to draw all system tickers.
 */
function drawTickers(props, canvas) {
  drawTicker(props, canvas, {locationX: 0, locationY: 0}, starColor)
  var system = getSystem(props)
  if (system !== undefined) {
    Object.keys(system.ssBodies).map(function(bodyKey) {
      var bodyData = system.ssBodies[bodyKey]
      var color = bodyColor
      if (bodyData.bType === 'Moon') color = moonColor
      else if (bodyData.bType === 'Comet') color = cometColor
      else if (bodyData.bType === 'Asteroid') color = asteroidColor
      drawTicker(props, canvas, bodyData.bLocation, color)
      return null
    })
    Object.keys(system.ssShips).map(function(shipKey) {
      var shipData = system.ssShips[shipKey]
      drawTicker(props, canvas, shipData.sLocation, shipColor)
      return null
    })
  }
}

/**
 * Helper function to draw an object ticker.
 */
function drawTicker(props, canvas, objectLocation, tickerColor) {
  var zoom = getZoom(props)
  var locationX = 0
  var locationY = 0
  if (objectLocation.bLocationX) {
    locationX = objectLocation.bLocationX
    locationY = objectLocation.bLocationY
  } else if (objectLocation.sLocationX) {
    locationX = objectLocation.sLocationX
    locationY = objectLocation.sLocationY
  }
  var topLeft = {
    x: -canvas.viewportTransform[4] / zoom,
    y: -canvas.viewportTransform[5] / zoom
  }
  var bottomRight = {
    x: (canvas.viewportTransform[4] - canvas.getWidth()) / -zoom,
    y: (canvas.viewportTransform[5] - canvas.getHeight()) / -zoom
  }
  if (locationX > topLeft.x &&
      locationX < bottomRight.x &&
      locationY > topLeft.y &&
      locationY < bottomRight.y) {
    // Object is visible, no need to draw ticker
    return null
  }
  // Figure out ticker's X position
  var tickerX = 0
  if (locationX < topLeft.x) {
    tickerX = topLeft.x + tickerSize[0] / 2 / zoom
  } else if (locationX > bottomRight.x) {
    tickerX = bottomRight.x - tickerSize[0] / 2 / zoom
  } else {
    tickerX = locationX
  }
  // Figure out ticker's Y position
  var tickerY = 0
  var angle = 0
  if (locationY < topLeft.y) {
    tickerY = topLeft.y + tickerSize[1] / 2 / zoom
    angle = 0
  } else if (locationY > bottomRight.y) {
    tickerY = bottomRight.y - tickerSize[1] / 2 / zoom
    angle = 180
  } else {
    tickerY = locationY
    if (locationX < topLeft.x) {
      angle = 270
    } else {
      angle = 90
    }
  }
  var ticker = new fabric.Triangle({
    width: tickerSize[0],
    height: tickerSize[1],
    angle: angle,
    fill: tickerColor,
    left: tickerX,
    top: tickerY,
    originX: 'center',
    originY: 'center',
    scaleX: 1 / zoom,
    scaleY: 1 / zoom,
    type: 'ticker'
  })
  ticker.selectable = false
  canvas.add(ticker)
}

export { clearTickers, drawTickers }