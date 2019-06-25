import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WidthProvider, Responsive } from 'react-grid-layout'
import { removeGridItem, saveGridLayout } from '../../redux/actions/grid/gridActions'
import GridItem from '../../components/Grid/GridItem'
import Engines from '../Engine/Engines'
import NewEngine from '../Engine/NewEngine'
import Ships from '../Ship/Design/ShipDesigns'
import NewShip from '../Ship/Design/NewShipDesign'
import Starmap from '../Starmap/Starmap'
import './HomeGrid.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

class HomeGrid extends React.Component {
  constructor(props) {
    super(props)
    this.starmaps = {} // Keep track of starmaps on the grid in order to resize properly
  }
  static get defaultProps() {
    return {
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    }
  }
  resetLayout() {
    this.props.saveGridLayout({}, {lg: [], sm: []})
  }
  onLayoutChange(layout, layouts) {
    this.props.saveGridLayout(this.props.grid.content, layouts)
  }
  onResizeStop() {
    Object.keys(this.starmaps).map(function(key) {
      if (this.starmaps[key]) {
        this.starmaps[key].resize()
      } else {
        delete this.starmaps[key]
      }
    }.bind(this))
  }
  getGridComponent(data, key) {
    switch(data.componentType) {
    case 'Engines':
      return <Engines {...data.props} playerRace={this.props.playerRace} />
    case 'NewEngine':
      return <NewEngine {...data.props} playerRace={this.props.playerRace} />
    case 'Ships':
      return <Ships {...data.props} playerRace={this.props.playerRace} />
    case 'NewShip':
      return <NewShip {...data.props} playerRace={this.props.playerRace} />
    case 'Starmap':
      return <Starmap {...data.props} playerRace={this.props.playerRace} onRef={ref => (this.starmaps[key] = ref)} />
    default:
      return
    }
  }
  render() {
    var gridItems = Object.keys(this.props.grid.content).map(function(key) {
      return (
        <div key={key}>
          <GridItem title={this.props.grid.content[key].title} deleteClick={this.props.removeGridItem.bind(this, key)}>
            {this.getGridComponent(this.props.grid.content[key], key)}
          </GridItem>
        </div>
      )
    }.bind(this))
    return (
      <ResponsiveReactGridLayout
        className="home-grid"
        cols={this.props.cols}
        rowHeight={this.props.rowHeight}
        layouts={this.props.grid.layouts}
        draggableHandle='.grid-header-title'
        compactType={null}
        onLayoutChange={(layout, layouts) =>
          this.onLayoutChange(layout, layouts)
        }
        onResizeStop={() =>
          this.onResizeStop()
        }
      >
        {gridItems}
      </ResponsiveReactGridLayout>
    )
  }
}

HomeGrid.propTypes = {
  grid: PropTypes.object.isRequired,
  removeGridItem: PropTypes.func.isRequired,
  saveGridLayout: PropTypes.func.isRequired,
  cols: PropTypes.object.isRequired,
  rowHeight: PropTypes.number.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  grid: state.grid
})

export default connect(mapStateToProps, { removeGridItem, saveGridLayout })(HomeGrid)