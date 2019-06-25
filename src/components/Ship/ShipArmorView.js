import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Glyphicon } from 'react-bootstrap'
import './ShipArmorView.css'

class ShipArmorView extends React.Component {
  render() {
    var armorRating = this.props.ship.sArmor.saRating
    if (armorRating < 1) {
      return <span><strong>No armor</strong></span>
    }
    // Maybe switch up tile glyph depending on armor type?
    //var armorName = this.props.ship.sArmor.saName
    var intactGlyph = 'stop' // Other candidates - th, th-large, align-justify, hamburger, oil, just gray background
    var damagedGlyph = 'stop' // Other candidates - remove, fire, fullscreen, flash, just red background

    var armorGrid = this.props.ship.sArmor.saGrid
    var armorTiles = Array(armorGrid.length)
    armorGrid.map(function(row, y) {
      armorTiles[y] = Array(row.length + 1)
      row.map(function(tile, x) {
        if (tile === 'ArmorIntact') {
          armorTiles[y][x] = <Glyphicon className='tile-intact' key={y + '-' + x} glyph={intactGlyph} />
        } else {
          armorTiles[y][x] = <Glyphicon className='tile-damaged' key={y + '-' + x} glyph={damagedGlyph} />
        }
        return null
      })
      armorTiles[y][row.length] = <br key={'armorlinebreak-' + y} />
      return null
    })
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Armor Status</Panel.Title>
        </Panel.Heading>
        <Panel.Body id='armor-layers'>
          {armorTiles}
        </Panel.Body>
      </Panel>
    )
  }
}

ShipArmorView.propTypes = {
  ship: PropTypes.object.isRequired
}

export default ShipArmorView