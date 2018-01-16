import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

import Form from './components/Form'

class App extends React.Component {
  render (){
    const store = configureStore()
    return (
      <Provider store={store}>
        <div className="wrapper">
          <Form />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render (<App/>, document.getElementById("app") )