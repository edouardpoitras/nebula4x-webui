import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import uuidv4 from 'uuid/v4'
import { fetchSystem } from '../../redux/actions/systems/systemActions'
import { addGridItem } from '../../redux/actions/grid/gridActions'
import { addStarmap, updateStarmap } from '../../redux/actions/starmaps/starmapActions'
import { newFabricCanvas, resizeCanvas, getCanvasCenter, canvasMouseDown, canvasMouseUp, canvasMouseMove, canvasMouseOut, canvasMouseOver, canvasMouseWheel } from './canvas'
import { getZoom, getSystem, getSystemId } from './utils'
import { drawStar, centerStar } from './star'
import { drawShips } from './ships'
import { drawMissles } from './missles'
import { drawPackets } from './packets'
import { drawWormholes } from './wormholes'
import { drawScale } from './scale'
import { drawZoomHelper } from './zoom-helper'
import { drawBodies } from './bodies'
import { drawTickers } from './tickers'
import { redrawMenu } from './status-menu'
import './Starmap.css'

class Starmap extends React.Component {
  constructor(props) {
    super(props)
    // Set class-level variables
    this.canvasId = uuidv4()
    this.generatedCanvas = {}
    this.updateStarmapDisplay = this.updateStarmapDisplay.bind(this)
  }

  /**
   * Ensure we draw the canvas on mount and on HomeGrid resize.
   */
  componentDidMount() {
    // Generate the canvas DOM manually
    this.generatedCanvas.innerHTML = ''
    let c = document.createElement('canvas')
    c.setAttribute('id', this.canvasId)
    this.generatedCanvas.appendChild(c)
    // Create and configure canvas
    this.canvas = newFabricCanvas(this.canvasId)
    this.canvas.setBackgroundColor('black')
    resizeCanvas(this.canvas, this.canvasId)
    this.updateStarmapDisplay()
    // Get zoom level
    var zoom = getZoom(this.props)
    if (this.props.zoom) {
      zoom = this.props.zoom
    }
    this.canvas.setZoom(zoom)
    centerStar(this.props, this.canvas)
    // Add to starmaps if necessary
    var coords = getCanvasCenter(this.props, this.canvas)
    if (this.props.onGrid &&
        this.props.gridItemId &&
        (!this.props.starmaps[this.props.gridItemId])) {
      this.props.addStarmap(this.props.gridItemId, zoom, coords[0], coords[1])
    } else if (!this.props.onGrid && !this.props.starmaps[getSystemId(this.props)]) {
      this.props.addStarmap(getSystemId(this.props), zoom, coords[0], coords[1])
    }
    this.canvas.selection = false
    this.canvas.hoverCursor = 'default'
    // Specify canvas zoom/pan capability as well as click callbacks.
    this.canvas.on('mouse:down', function(opt) {
      canvasMouseDown(this.props, this.canvas, opt)
    }.bind(this))
    this.canvas.on('mouse:up', function(opt) {
      canvasMouseUp(this.canvas, this.props, opt, this.props.history)
    }.bind(this))
    this.canvas.on('mouse:move', function(opt) {
      canvasMouseMove(this.props, this.canvas, opt)
    }.bind(this))
    this.canvas.on('mouse:over', function(opt) {
      canvasMouseOver(this.props, this.canvas, opt, this.props.systems)
    }.bind(this))
    this.canvas.on('mouse:out', function(opt) {
      canvasMouseOut(this.canvas, opt)
    }.bind(this))
    this.canvas.on('mouse:wheel', function(opt) {
      canvasMouseWheel(this.props, this.canvas, opt)
    }.bind(this))
    // Ensure we can resize the canvas from the HomeGrid component
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  /**
   * Cleanup after our componentDidMount().
   */
  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined)
    }
  }

  /**
   * Ensure we re-draw the canvas on state change.
   */
  componentDidUpdate() {
    // Draw entities on map
    this.canvas.clear()
    this.canvas.setBackgroundColor('black')
    this.canvas.setZoom(getZoom(this.props))
    centerStar(this.props, this.canvas)
    this.updateStarmapDisplay()
  }

  /**
   * Update star map based on the current global state.
   */
  updateStarmapDisplay() {
    var system = getSystem(this.props)
    if (system !== undefined && system.ssDiscovered[this.props.playerRace]) {
      if (system.ssStar) drawStar(this.props, this.canvas, system.ssStar)
      if (system.ssBodies) drawBodies(this.props, this.canvas, system.ssBodies)
      if (system.ssWormholes) drawWormholes(this.props, this.canvas, system.ssWormholes, this.props.systems)
      if (system.ssMineralPackets) drawPackets(this.props, this.canvas, system.ssMineralPackets)
      if (system.ssShips) drawShips(this.props, this.canvas, system.ssShips)
      if (system.ssMissleSalvos) drawMissles(this.props, this.canvas, system.ssMissleSalvos)
      // TODO: Should probably have separate fetches for different types of data instead of fetching entire star system.
      if (system.ssStar && system.ssBodies && system.ssShips) drawTickers(this.props, this.canvas)
      else {
        var systemId = getSystemId(this.props)
        // TODO: Fix bug that calls this twice when coming from galaxy map.
        // Probably related to this function being called on both component mount and component update.
        this.props.fetchSystem(systemId)
      }
      drawScale(this.props, this.canvas)
      drawZoomHelper(this.props, this.canvas)
      redrawMenu(this.props, this.canvas, this.props.playerRace)
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Wrapper function to resize the canvas using a reference to the starmap prop.
   */
  resize() {
    resizeCanvas(this.canvas, this.canvasId)
  }

  render() {
    // Need this hacky render because React doesn't like how Fabric.js modifies DOM.
    var systemId = getSystemId(this.props)
    var headerActions = ''
    if (systemId in this.props.systems && !(this.props.onGrid)) {
      var starName = this.props.systems[systemId].ssStar.starName
      headerActions = <Glyphicon
        title='Add to Grid'
        glyph='th'
        onClick={this.props.addGridItem.bind(this, starName, 'Starmap', {systemId: systemId, onGrid: true})}
      />
    }
    return (
      <div className='starmap-container'>
        <div className='starmap-actions'>{headerActions}</div>
        <div className='starmap' ref={generatedCanvas => { this.generatedCanvas = generatedCanvas }} />
      </div>
    )
  }
}

Starmap.propTypes = {
  onGrid: PropTypes.bool,
  systemId: PropTypes.string,
  playerRace: PropTypes.number.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  gridItemId: PropTypes.string,
  match: PropTypes.object,
  zoom: PropTypes.number,
  onRef: PropTypes.func,
  addGridItem: PropTypes.func.isRequired,
  addStarmap: PropTypes.func.isRequired,
  updateStarmap: PropTypes.func.isRequired,
  starmaps: PropTypes.object.isRequired,
  systems: PropTypes.object.isRequired,
  history: PropTypes.object,
  // Just to keep react linter happy.
  clear: PropTypes.func,
  setBackgroundColor: PropTypes.func,
  setZoom: PropTypes.func,
  viewportTransform: PropTypes.func
}

const mapStateToProps = state => ({
  starmaps: state.starmaps,
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchSystem, addGridItem, addStarmap, updateStarmap })(Starmap))