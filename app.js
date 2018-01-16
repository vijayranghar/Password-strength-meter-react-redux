import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

import LoginForm from './components/LoginForm'

class App extends React.Component {
  render (){
    const store = configureStore()
    return (
      <Provider store={store}>
        <div className="wrapper">
          <LoginForm />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render (<App/>, document.getElementById("app") )