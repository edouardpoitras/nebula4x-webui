import React from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import './GridItem.css'

class GridItem extends React.Component {
  render() {
    return (
      <div className="grid-draggable">
        <span className="grid-header-title">
          {this.props.title}<Glyphicon glyph="remove" onClick={this.props.deleteClick} />
        </span>
        <div className="grid-item-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  deleteClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default GridItem