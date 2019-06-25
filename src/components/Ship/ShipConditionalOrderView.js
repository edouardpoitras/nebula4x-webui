import React from 'react'
import PropTypes from 'prop-types'
import { getAvailableConditions } from '../../utils/helpers'

class ShipConditionalOrderView extends React.Component {
  render() {
    var currentCondition = 'None'
    var conditionAttributes = []
    var availableConditions = getAvailableConditions()
    if (this.props.condition) {
      var conditionName = availableConditions ? availableConditions[this.props.condition.tag].name : this.props.condition.tag
      var conditionFields = Object.keys(this.props.condition)
      for (let conditionFieldId in conditionFields) {
        var conditionField = conditionFields[conditionFieldId]
        var value = this.props.condition[conditionField]
        if (conditionField.includes('Fuel')) {
          conditionAttributes.push('Minimum Fuel = ' + value + '%')
        } else if (conditionField.includes('Shield')) {
          conditionAttributes.push('Minimum Shields = ' + value + '%')
        }
      }
      if (conditionAttributes.length > 0) {
        if (this.props.justAttributes) {
          currentCondition = conditionAttributes.join(', ')
        } else {
          currentCondition = conditionName + ' (' + conditionAttributes.join(', ') + ')'
        }
      } else {
        currentCondition = conditionName
      }
    }
    return currentCondition
  }
}

ShipConditionalOrderView.propTypes = {
  condition: PropTypes.object,
  systems: PropTypes.object,
  systemId: PropTypes.number,
  justAttributes: PropTypes.bool
}

export default ShipConditionalOrderView