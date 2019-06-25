import { fabric } from 'fabric'
import { clearTickers, drawTickers } from './tickers'
import { drawTooltip, clearTooltip } from './tooltips'
import { textConstantScale, getSystemId, zoomType, getZoom, resetZoom } from './utils'
import { drawMenu } from './status-menu'

// Keep track of mouse actions on canvas.
var isDragging = false
var lastPosX = 0
var lastPosY = 0

/**
 * Creates a new fabric canvas instance.
 */
function newFabricCanvas(canvasId) {
  return new fabric.Canvas(canvasId)
}

/**
 * Helper function to resize the canvas to the full width/height of the container element.
 */
function resizeCanvas(canvas, canvasId) {
  var width = 640
  var height = 480
  if (window.location.pathname === '/') { // We're on the grid
    var gridCanvas = document.getElementById(canvasId)
    var gridContainer = gridCanvas.parentNode.parentNode.parentNode.parentNode
    width = gridContainer.clientWidth
    height = gridContainer.clientHeight
  } else { // On a starmap page
    var navbarHeight = document.getElementById('nebula4x-nav').clientHeight
    var navbarMargins = 20
    width = window.innerWidth
    height = window.innerHeight - navbarHeight - (navbarMargins * 2)
  }
  canvas.setWidth(width)
  canvas.setHeight(height)
}

/**
 * Helper function to get the center location of the canvas.
 */
function getCanvasCenter(props, canvas) {
  if (props.onGrid &&
      props.gridItemId &&
      props.starmaps[props.gridItemId]) {
    return [
      props.starmaps[props.gridItemId].coordX,
      props.starmaps[props.gridItemId].coordY
    ]
  } else if (props.starmaps[getSystemId(props)]) {
    return [
      props.starmaps[getSystemId(props)].coordX,
      props.starmaps[getSystemId(props)].coordY
    ]
  } else {
    var canvasCenter = canvas.getCenter()
    return [canvasCenter.left, canvasCenter.top]
  }
}

/**
 * Helper function to get the top left location on the starmap.
 */
function getTopLeftLocation(props, canvas) {
  var center = getCanvasCenter(props, canvas)
  var zoom = getZoom(props)
  return [-center[0] / zoom, -center[1] / zoom]
}

/**
 * Helper function to get the bottom right location on the starmap.
 */
function getBottomRightLocation(props, canvas) {
  var center = getCanvasCenter(props, canvas)
  var zoom = getZoom(props)
  var width = canvas.getWidth()
  var height = canvas.getHeight()
  return [(-center[0] + width) / zoom, (-center[1] + height) / zoom]
}

/**
 * Callback function for mouse down action on canvas.
 */
function canvasMouseDown(props, canvas, opt) {
  var evt = opt.e
  isDragging = true
  lastPosX = evt.clientX
  lastPosY = evt.clientY
  if (opt.target) {
    if (opt.target.buttonType) {
      window.location.href = opt.target.buttonRedirect
    }
  }
}

/**
 * Callback function for mouse up action on canvas.
 */
function canvasMouseUp(canvas, props, opt, history) {
  isDragging = false
  // Handle object clicks.
  if (opt.target && opt.target.objectType === 'zoomHelper') {
    resetZoom(props, canvas)
  } else if (opt.target && opt.target.objectType === 'wormhole') {
    var wormhole = opt.target.metadata
    if (wormhole.wSurveyed && wormhole.wJumpGate) {
      history.push('/starmap/' + wormhole.wDestinationStarId)
    }
  } else if (opt.target) {
    drawMenu(props, canvas, opt.target)
  }
  // Save new state
  var starmapId = props.gridItemId || getSystemId(props)
  props.updateStarmap(
    starmapId, getZoom(props),
    canvas.viewportTransform[4],
    canvas.viewportTransform[5]
  )
}

/**
 * Callback function for mouse move action on canvas.
 */
function canvasMouseMove(props, canvas, opt) {
  if (isDragging) {
    // Pan canvas
    var e = opt.e
    canvas.viewportTransform[4] += e.clientX - lastPosX
    canvas.viewportTransform[5] += e.clientY - lastPosY
    lastPosX = e.clientX
    lastPosY = e.clientY
    // Re-render canvas
    var starmapId = props.gridItemId || getSystemId(props)
    props.updateStarmap(
      starmapId, getZoom(props),
      canvas.viewportTransform[4],
      canvas.viewportTransform[5]
    )
  }
}

/**
 * Callback function for mouse hover on object.
 */
function canvasMouseOver(props, canvas, opt, systems) {
  if (opt.target) {
    if (opt.target.textObject) {
      opt.target.set('opacity', 0.75)
      opt.target.textObject.set('scaleX', opt.target.textObject.scaleX * 2)
      opt.target.textObject.set('scaleY', opt.target.textObject.scaleY * 2)
      if (opt.target.objectType) {
        if (opt.target.objectType === 'wormhole' || opt.target.objectType === 'asteroid') {
          opt.target.textObject.set('opacity', 1)
        }
        drawTooltip(props, canvas, opt.target, systems)
      }
      canvas.requestRenderAll()
    } else if (opt.target.buttonType) {
      opt.target.backgroundColor = 'blue'
      canvas.requestRenderAll()
    } else if (opt.target.objectType && opt.target.objectType === 'zoomHelper') {
      opt.target.set('opacity', 0.75)
      opt.target.set('scaleX', opt.target.scaleX * 1.5)
      opt.target.set('scaleY', opt.target.scaleY * 1.5)
      canvas.requestRenderAll()
    }
  }
}

/**
 * Callback function for mouse hover leave object.
 */
function canvasMouseOut(canvas, opt) {
  if (opt.target) {
    if (opt.target.textObject) {
      if (opt.target.objectType === 'wormhole' || opt.target.objectType === 'asteroid') {
        opt.target.textObject.set('opacity', 0)
      }
      opt.target.set('opacity', 1)
      opt.target.textObject.set('scaleX', opt.target.textObject.scaleX / 2)
      opt.target.textObject.set('scaleY', opt.target.textObject.scaleY / 2)
      clearTooltip(canvas)
      canvas.requestRenderAll()
    } else if (opt.target.buttonType) {
      opt.target.backgroundColor = 'cyan'
      canvas.requestRenderAll()
    } else if (opt.target.objectType && opt.target.objectType === 'zoomHelper') {
      opt.target.set('opacity', 1)
      opt.target.set('scaleX', opt.target.scaleX * 2 / 3)
      opt.target.set('scaleY', opt.target.scaleY * 2 / 3)
      canvas.requestRenderAll()
    }
  }
}

/**
 * Callback function for mouse wheel action on canvas.
 */
function canvasMouseWheel(props, canvas, opt) {
  var zoom = canvas.getZoom(props)
  if (opt.e.deltaY > 0 && zoom >= 1e-9) {
    zoom = zoom * 0.9
  } else if (opt.e.deltaY <= 0 && zoom < 0.025) { // Rough estimate of where things start to break down.
    zoom = zoom * 1.1
  }
  if (zoomType === 'origin') {
    // Zoom from middle of canvas
    var canvasCenter = canvas.getCenter()
    canvas.zoomToPoint({x: canvasCenter.left, y: canvasCenter.top}, zoom)
  } else {
    // Zoom from mouse cursor
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
  }
  var starmapId = props.gridItemId || getSystemId(props)
  props.updateStarmap(
    starmapId, zoom,
    canvas.viewportTransform[4],
    canvas.viewportTransform[5]
  )
  // Re-draw tickers
  clearTickers(canvas)
  drawTickers(props, canvas)
  scaleObjectsWithZoom(props, canvas)
  opt.e.preventDefault()
  opt.e.stopPropagation()
}

/**
 * Helper function to appropriately scale objects with zoom.
 */
function scaleObjectsWithZoom(props, canvas) {
  var zoom = getZoom(props)
  canvas.forEachObject(function(object) {
    // Text objects
    if (object.get('type') === 'text') {
      object.scaleX = 1 / zoom / textConstantScale
      object.scaleY = 1 / zoom / textConstantScale
    // Body ticker objects
    } else if (object.get('type') === 'triangle') {
      object.scaleX = 1 / zoom
      object.scaleY = 1 / zoom
    }
  })
}

/**
 * Helper function to move an object on the canvas.
 */
function moveObject(canvas, object, position) {
  object.set({left: position[0], top: position[1]})
  canvas.setCoords()
  canvas.renderAll()
  canvas.calcOffset()
}

export { newFabricCanvas, resizeCanvas, getCanvasCenter, getTopLeftLocation, getBottomRightLocation, canvasMouseUp, canvasMouseDown, canvasMouseMove, canvasMouseOver, canvasMouseOut, canvasMouseWheel, moveObject }