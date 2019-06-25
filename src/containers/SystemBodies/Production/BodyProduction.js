import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Tab, Row, Col } from 'react-bootstrap'
import { fetchProduction, updateProduction } from '../../../redux/actions/production/productionActions'
import { fetchInstallments } from '../../../redux/actions/installments/installmentActions'
import { fetchRaceResearch } from '../../../redux/actions/research/researchActions'
import ProductionSlider from '../../../components/Body/ProductionSlider'

class BodyProduction extends React.Component {
  constructor(props) {
    super(props)
    this.getCurrentTotal = this.getCurrentTotal.bind(this)
    this.makeOnSliderChanger = this.makeOnSliderChanger.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
    this.getState = this.getState.bind(this)
    this.pullState = this.pullState.bind(this)
    this.state = {}
    if (Object.keys(this.props.research).length < 1) {
      // Assume BodyResearch has already fetched the research data.
      //this.props.fetchRaceResearch()
      this.props.fetchInstallments()
      this.props.fetchProduction(this.pullState)
    } else {
      // Assume BodyResearch has already fetched the research data.
      //if (!this.props.research[this.props.playerRace]) this.props.fetchRaceResearch()
      if (!this.props.installments) this.props.fetchInstallments()
      if (!this.props.production) this.props.fetchProduction(this.pullState)
    }
  }
  getState() {
    var newState = {}
    Object.keys(this.props.production).map(function(bodyId) {
      Object.keys(this.props.installments).map(function(instId) {
        if (!newState[bodyId]) {
          newState[bodyId] = {}
        }
        if (this.props.production[bodyId] && this.props.production[bodyId][instId]) {
          newState[bodyId][instId] = this.props.production[bodyId][instId].ipAllocation
        } else {
          newState[bodyId][instId] = 0
        }
        return null
      }.bind(this))
      return null
    }.bind(this))
    return newState
  }
  pullState() {
    this.setState(this.getState())
  }
  getCurrentTotal() {
    var count = 0
    if (this.state[this.props.bodyId]) {
      Object.keys(this.state[this.props.bodyId]).map(function(prod) {
        if (this.state[this.props.bodyId][prod]) {
          count += this.state[this.props.bodyId][prod]
        }
        return null
      }.bind(this))
    }
    return count
  }
  makeOnSliderChanger(id) {
    return function(value) {
      var currentTotal = this.getCurrentTotal()
      var oldSliderValue = 0
      if (this.state[this.props.bodyId] && this.state[this.props.bodyId][id]) {
        oldSliderValue = this.state[this.props.bodyId][id]
      }
      var newTotal = currentTotal + value - oldSliderValue
      if (newTotal <= 100) {
        this.setState(function(state) {
          var newState = Object.assign({}, state)
          if (!newState[this.props.bodyId]) {
            newState[this.props.bodyId] = {}
          }
          newState[this.props.bodyId][id] = value
          return newState
        })
      } else if (currentTotal < 100) {
        var adjustedAmount = 100 - currentTotal + oldSliderValue
        this.setState(function(state) {
          var newState = Object.assign({}, state)
          if (!newState[this.props.bodyId]) {
            newState[this.props.bodyId] = {}
          }
          newState[this.props.bodyId][id] = adjustedAmount
          return newState
        })
      }
    }.bind(this)
  }
  onAfterChange() {
    this.props.updateProduction(this.props.bodyId, this.state[this.props.bodyId])
  }
  render() {
    if (Object.keys(this.props.research).length < 1 || !this.props.research[this.props.playerRace]) {
      return null
    }
    var info = (
      <div>
        <br /><span><strong>Current Production Capacity - {this.getCurrentTotal()}%</strong></span><br /><br />
      </div>
    )
    var productionItems = []
    Object.keys(this.props.research[this.props.playerRace]).map(function(researchType) {
      Object.keys(this.props.research[this.props.playerRace][researchType].unlocked).map(function(instResearchId) {
        var instResearch = this.props.research[this.props.playerRace][researchType].unlocked[instResearchId]
        if (!instResearch.irId) {
          return null
        }
        // We have an installment research.
        var inst = instResearch.irInstallment
        var value = 0
        var prodCost = inst.iCost
        var prodProgress = 0
        if (this.props.production[this.props.bodyId] && this.props.production[this.props.bodyId][instResearchId]) {
          prodProgress = Math.round(this.props.production[this.props.bodyId][instResearchId].ipProgress * 100).toLocaleString()
        }
        if (this.state[this.props.bodyId] && this.state[this.props.bodyId][instResearchId]) {
          value = this.state[this.props.bodyId][instResearchId]
        }
        var prodName = inst.iName + ' (' + prodCost + ' BP - ' + prodProgress + '%)'
        productionItems.push(
          <Row key={instResearchId} className='clearfix'>
            <Col sm={3}>
              <span>{prodName}</span>
            </Col>
            <Col sm={9}>
              <Tab.Content animation>
                <ProductionSlider
                  onSliderChange={this.makeOnSliderChanger(instResearchId)}
                  onAfterChange={this.onAfterChange}
                  value={value}
                />
              </Tab.Content>
            </Col>
          </Row>
        )
        return null
      }.bind(this))
    }.bind(this))
    return (
      <Grid fluid={true}>
        {info}
        {productionItems}
      </Grid>
    )
  }
}

BodyProduction.propTypes = {
  bodyId: PropTypes.number.isRequired,
  production: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
  installments: PropTypes.object.isRequired,
  fetchProduction: PropTypes.func.isRequired,
  fetchInstallments: PropTypes.func.isRequired,
  updateProduction: PropTypes.func.isRequired,
  fetchRaceResearch: PropTypes.func.isRequired,
  playerRace: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  production: state.production,
  installments: state.installments,
  research: state.research
})

export default connect(mapStateToProps, { fetchProduction, updateProduction, fetchInstallments, fetchRaceResearch })(BodyProduction)