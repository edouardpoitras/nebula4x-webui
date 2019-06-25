import React from 'react'
import PropTypes from 'prop-types'
import Upload from 'rc-upload'
import { connect } from 'react-redux'
import { saveState, loadState } from '../../redux/actions/state/stateActions'
import Nebula4xGlobals from '../../utils/globals'

class LoadGame extends React.Component {
  render() {
    const importStateUrl = this.context.apiEndpoint + '/api/import-state'
    var options = {
      action: importStateUrl,
      beforeUpload(file) {
        console.log('beforeUpload', file.name)
      },
      onStart: (file) => {
        console.log('onStart', file.name)
        // this.refs.inner.abort(file);
      },
      onSuccess(file) {
        console.log('onSuccess', file)
        window.location.reload()
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name)
      },
      onError(err) {
        console.log('onError', err)
      }
    }
    return (
      <Upload {...options}>Import Game State</Upload>)
  }
}

LoadGame.contextType = Nebula4xGlobals

LoadGame.propTypes = {
  state: PropTypes.object.isRequired,
  saveState: PropTypes.func.isRequired,
  loadState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  state: state
})

export default connect(mapStateToProps, { saveState, loadState })(LoadGame)