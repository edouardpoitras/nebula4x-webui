import { fabric } from 'fabric'
import { getTextAttributes, getZoom} from './utils'

var bodyColor = 'cyan'
var moonColor = 'white'
var cometColor = 'blue'
var asteroidColor = 'gray'
var minBodyRadius = 5
var minCometRadius = 3
var minAsteroidRadius = 3
var minMoonRadius = 3

/**
 * Helper function to draw the system's bodies.
 */
function drawBodies(props, canvas, bodies) {
  Object.keys(bodies).map(function(bodyKey) {
    var bodyData = bodies[bodyKey]
    var location = bodyData.bLocation
    var locationX = location.bLocationX
    var locationY = location.bLocationY
    var zoom = getZoom(props)
    var bodyText = new fabric.Text(bodyData.bName,
      Object.assign({}, getTextAttributes(props), {left: locationX}, {top: locationY + 20 / zoom}))
    var radius = bodyData.bRadius
    var color = 'white'
    if (bodyData.bType === 'Moon') {
      if (radius * zoom < minMoonRadius) {
        radius = minMoonRadius / zoom
      }
      color = moonColor
    } else if (bodyData.bType === 'Comet') {
      if (radius * zoom < minCometRadius) {
        radius = minCometRadius / zoom
      }
      color = cometColor
    } else if (bodyData.bType === 'Asteroid') {
      if (radius * zoom < minAsteroidRadius) {
        radius = minAsteroidRadius / zoom
      }
      color = asteroidColor
    } else {
      if (radius * zoom < minBodyRadius) {
        radius = minBodyRadius / zoom
      }
      color = bodyColor
    }
    var body = new fabric.Circle({
      radius: radius,
      fill: color,
      left: locationX,
      top: locationY,
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
      textObject: bodyText,
      metadata: bodyData,
      objectType: 'body'
    })
    body.selectable = false
    bodyText.selectable = false
    canvas.add(body)
    canvas.add(bodyText)
    return null
  })
}

export {bodyColor, moonColor, cometColor, asteroidColor, drawBodies}