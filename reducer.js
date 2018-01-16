import { SET_PASSWORD_STRENGTH } from './action'

const reducer = (state={ passwordStrength:'' }, action) => {
  switch (action.type) {
    case SET_PASSWORD_STRENGTH:
      return state = {
        passwordStrength: action.passwordStrength,
      }
    default:
      return state
  }
}

export default reducer
