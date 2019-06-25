var textConstantScale = 1.5
var zoomType = 'origin'
var defaultZoomLevel = 1.0e-7 // Reasonable default zoom level for big star systems

/**
 * Helper function to get the current system ID based on path or prop.
 */
function getSystemId(props) {
  if (props.systemId) {
    return props.systemId
  } else {
    return props.match.params.systemId
  }
}

/**
 * Helper function to get the current system for this component.
 */
function getSystem(props) {
  return props.systems[getSystemId(props)]
}

/**
 * Helper function to get the starmap prop zoom level.
 */
function getZoom(props) {
  if (props.onGrid &&
      props.gridItemId &&
      props.starmaps[props.gridItemId]) {
    return props.starmaps[props.gridItemId].zoom
  } else if (props.starmaps[getSystemId(props)]) {
    return props.starmaps[getSystemId(props)].zoom
  } else {
    return defaultZoomLevel
  }
}

/**
 * Helper function to reset the starmap zoom.
 */
function resetZoom(props, canvas) {
  if (props.onGrid &&
      props.gridItemId &&
      props.starmaps[props.gridItemId]) {
    props.starmaps[props.gridItemId].zoom = defaultZoomLevel
  }
  if (props.starmaps[getSystemId(props)]) {
    props.starmaps[getSystemId(props)].zoom = defaultZoomLevel
  }
  canvas.setZoom(defaultZoomLevel)
  canvas.viewportTransform[4] = canvas.getWidth() / 2
  canvas.viewportTransform[5] = canvas.getHeight() / 2
  canvas.requestRenderAll()
}

/**
 * Helper function to fetch text attributes for an object.
 */
function getTextAttributes(props) {
  var zoom = getZoom(props)
  var textAttributes = {
    fontSize: 18,
    fill: '#FFFFFF',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    scaleX: 1 / zoom / textConstantScale,
    scaleY: 1 / zoom / textConstantScale,
    selectable: false
  }
  return textAttributes
}

export { textConstantScale, zoomType, resetZoom, getSystemId, getSystem, getZoom, getTextAttributes }