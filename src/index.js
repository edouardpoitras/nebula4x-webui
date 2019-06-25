import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './redux/store'
import registerServiceWorker from './utils/registerServiceWorker'
import Nebula4xGlobals from './utils/globals'

ReactDOM.render(
  <Provider store={store}>
    <Nebula4xGlobals.Provider value={Nebula4xGlobals._currentValue}>
      <App />
    </Nebula4xGlobals.Provider>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()