import React from 'react'
import { withRouter } from 'react-router-dom'
import Graph from 'react-graph-vis'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSystemsWormholes } from '../../redux/actions/systems/systemActions'
import './Galaxy.css'

class Galaxy extends React.Component {
  constructor(props) {
    super(props)
    if (Object.keys(this.props.systems).length < 1) {
      this.props.fetchSystemsWormholes()
    } else {
      for (let systemId in this.props.systems) {
        if (!this.props.systems[systemId].ssWormholes) {
          this.props.fetchSystemsWormholes()
          break
        }
      }
    }
  }
  render() {
    var graph = {nodes: [], edges: []}
    Object.keys(this.props.systems).map(function(systemId) {
      var system = this.props.systems[systemId]
      var star = system.ssStar
      var group = system.ssDiscovered[this.props.playerRace] ? 'discovered' : 'undiscovered'
      graph.nodes.push({id: systemId, label: star.starName, title: star.starName, group: group})
      var wormholes = system.ssWormholes
      for (var wormholeIdx in wormholes) {
        var wormhole = wormholes[wormholeIdx]
        if (wormhole.wSurveyed && wormhole.wDestinationStarId) {
          graph.edges.push({from: systemId, to: wormhole.wDestinationStarId})
        }
      }
      return null
    }.bind(this))
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    var options = {
      height: '' + height,
      nodes: {
        shape: 'star',
        font: {
          color: '#ffffff'
        }
      },
      edges: {
        arrows: {
          to: { enabled: false },
          middle: { enabled: false },
          from: { enabled: false }
        }
      },
      groups: {
        discovered: {
          color: {
            border: 'yellow',
            background: 'yellow',
            highlight: {
              border: 'white',
              background: 'white'
            }
          }
        },
        undiscovered: {
          color: {
            border: 'orange',
            background: 'orange',
            highlight: {
              border: 'gray',
              background: 'gray'
            }
          }
        }
      },
      layout: {
        improvedLayout: true
      },
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based', // barnesHut, forceAtlas2Based, repulsion, hierarchicalRepulsion
        repulsion: {
          centralGravity: 0.5,
          springLength: 200,
          springConstant: 0.5,
          nodeDistance: 200,
          damping: 0.2
        }
      }
    }
    var events = {
      select: function(event) {
        if (event.nodes[0] && this.props.systems[event.nodes[0]].ssDiscovered[this.props.playerRace]) {
          this.props.history.push('/starmap/' + event.nodes[0])
        }
      }.bind(this)
    }
    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    )
  }
}

Galaxy.propTypes = {
  systems: PropTypes.object.isRequired,
  playerRace: PropTypes.number.isRequired,
  history: PropTypes.object,
  fetchSystemsWormholes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  systems: state.systems
})

export default withRouter(connect(mapStateToProps, { fetchSystemsWormholes })(Galaxy))