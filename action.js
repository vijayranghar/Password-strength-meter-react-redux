export const SET_PASSWORD_STRENGTH = 'SET_PASSWORD_STRENGTH'
export const setPasswordStrength = (passwordStrength) => {
  return {
    type: SET_PASSWORD_STRENGTH,
    passwordStrength,
  }
}
