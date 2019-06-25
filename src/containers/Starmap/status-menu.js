import { fabric } from 'fabric'
import { getZoom, getSystemId, textConstantScale } from './utils'
import { getTopLeftLocation } from './canvas'

/**
 * Draw an object status menu near specified object.
 */
function drawMenu(props, canvas, object, playerRace) {
  if (object.objectType === 'star' ||
      object.objectType === 'body' ||
      object.objectType === 'ship') {
    canvas.statusMenuObject = object
  }
  redrawMenu(props, canvas, playerRace)
}

/**
 * Helper function to redraw the active status menu object.
 */
function redrawMenu(props, canvas, playerRace) {
  if (canvas.statusMenuObject) {
    if (canvas.statusMenuObject.objectType === 'star') drawStarMenu(props, canvas)
    else if (canvas.statusMenuObject.objectType === 'body') drawBodyMenu(props, canvas, playerRace)
    else if (canvas.statusMenuObject.objectType === 'ship') drawShipMenu(props, canvas)
  }
}

/**
 * Get the status menu background object.
 */
function getStatusMenuBackground(zoom, width, height) {
  return new fabric.Rect({
    width: width,
    height: height,
    stroke: 'green',
    strokeWidth: 5 / zoom,
    fill: 'white',
    scaleX: 1,
    scaleY: 1,
    opacity: 0.5
  })
}

/**
 * Get the status menu title object.
 */
function getStatusMenuTitle(zoom, width, height, text) {
  var title = new fabric.Text(text, {
    top: 10 / zoom,
    opacity: 0.7,
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale
  })
  title.left = Math.max(5, (width / 2 - title.width / 2 / zoom))
  return title
}

/**
 * Get the status menu view button.
 */
function getStatusMenuViewButton(zoom, width, height, link) {
  var viewButton = new fabric.Text('View', {
    width: width,
    height: height,
    top: 40 / zoom,
    opacity: 0.7,
    hoverCursor: 'pointer',
    backgroundColor: 'cyan',
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale
  })
  viewButton.left = Math.max(5, (width / 2 - viewButton.width / 2 / zoom))
  // So we can identify the object on mouse hover and properly redirect on click
  viewButton.buttonType = true
  viewButton.buttonRedirect = link
  return viewButton
}

/**
 * Draw a status menu near the star.
 */
function drawStarMenu(props, canvas) {
  var zoom = getZoom(props)
  var width = canvas.getWidth() / 4 / zoom
  var height = canvas.getHeight() / zoom
  var background = getStatusMenuBackground(zoom, width, height)
  var title = getStatusMenuTitle(zoom, width, height, canvas.statusMenuObject.metadata.starName)
  var viewButton = getStatusMenuViewButton(zoom, width, height, '/starmap/' + canvas.statusMenuObject.metadata.starId)
  var topLeft = getTopLeftLocation(props, canvas)
  canvas.statusMenu = new fabric.Group(
    [background, title, viewButton],
    {
      left: topLeft[0],
      top: topLeft[1]
    }
  )
  canvas.add(canvas.statusMenu)
  // Set button at higher z-index so that we can trigger a mouse hover
  canvas.moveTo(viewButton, 1000)
}

/**
 * Draw a status menu near the body.
 */
function drawBodyMenu(props, canvas, playerRace) {
  if (!canvas.statusMenuObject.metadata.bRace || canvas.statusMenuObject.metadata.bRace !== playerRace) {
    return
  }
  var zoom = getZoom(props)
  var width = canvas.getWidth() / 4 / zoom
  var height = canvas.getHeight() / zoom
  var background = getStatusMenuBackground(zoom, width, height)
  var bodyName = canvas.statusMenuObject.metadata.bName
  var bodyId = canvas.statusMenuObject.metadata.bId
  var systemId = getSystemId(props)
  var title = getStatusMenuTitle(zoom, width, height, bodyName)
  var viewButton = getStatusMenuViewButton(zoom, width, height, '/view/system-bodies/' + systemId + '/' + bodyId)
  var topLeft = getTopLeftLocation(props, canvas)
  canvas.statusMenu = new fabric.Group(
    [background, title, viewButton],
    {
      left: topLeft[0],
      top: topLeft[1]
    }
  )
  canvas.add(canvas.statusMenu)
  // Set button at higher z-index so that we can trigger a mouse hover
  canvas.moveTo(viewButton, 1000)
}

/**
 * Draw a status menu near the ship.
 */
function drawShipMenu(props, canvas) {
  var zoom = getZoom(props)
  var width = canvas.getWidth() / 4 / zoom
  var height = canvas.getHeight() / zoom
  var background = getStatusMenuBackground(zoom, width, height)
  var shipName = canvas.statusMenuObject.metadata.sName
  var shipId = canvas.statusMenuObject.metadata.sId
  var title = getStatusMenuTitle(zoom, width, height, shipName)
  var viewButton = getStatusMenuViewButton(zoom, width, height, '/view/ships/' + shipId)
  var topLeft = getTopLeftLocation(props, canvas)
  canvas.statusMenu = new fabric.Group(
    [background, title, viewButton],
    {
      left: topLeft[0],
      top: topLeft[1]
    }
  )
  canvas.add(canvas.statusMenu)
  // Set button at higher z-index so that we can trigger a mouse hover
  canvas.moveTo(viewButton, 1000)
}

/**
 * Clear the object menu.
 */
function clearMenu(canvas) {
  canvas.remove(canvas.statusMenu)
  canvas.statusMenu = null
  canvas.statusMenuObject = null
}

export { drawMenu, redrawMenu, drawBodyMenu, drawShipMenu, drawStarMenu, clearMenu}