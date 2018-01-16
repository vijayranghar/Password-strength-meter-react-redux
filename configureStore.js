import { createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'


export default function configureStore(initialState={}) {
  return createStore(reducer,initialState,applyMiddleware(logger))
}