import { fabric } from 'fabric'
import { getTextAttributes, getZoom } from './utils'
import { getCanvasCenter } from './canvas'

var starColor = 'orange'
var minStarRadius = 10

/**
 * Helper function to draw the system's star in the middle of the canvas.
 */
function drawStar(props, canvas, starData) {
  var zoom = getZoom(props)
  var starText = new fabric.Text(starData.starName,
    Object.assign({}, getTextAttributes(props), {left: 0}, {top: 25 / zoom}))
  var radius = starData.starRadius
  if (radius * zoom < minStarRadius) {
    radius = minStarRadius / zoom
  }
  var star = new fabric.Circle({
    radius: radius,
    fill: starColor,
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
    hoverCursor: 'pointer',
    textObject: starText,
    metadata: starData,
    objectType: 'star'
  })
  star.selectable = false
  starText.selectable = false
  canvas.add(star)
  canvas.add(starText)
}

/**
 * Helper function to center the star in the middle of the canvas.
 */
function centerStar(props, canvas) {
  var coords = getCanvasCenter(props, canvas)
  canvas.viewportTransform[4] = coords[0]
  canvas.viewportTransform[5] = coords[1]
}

export { starColor, drawStar, centerStar }