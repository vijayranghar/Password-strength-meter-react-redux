import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPasswordStrength } from '../../action'
import FontAwesome from 'react-fontawesome'

import style from './style.scss'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      errorMessage: '',
      showPassword: false,
    }
  }
  measureStrength = (password) => {
    let score = 0
    let a = 0
    let passwordStrength
    const regexPositive = [
      "[A-Z]",
      "[a-z]",
      "[0-9]",
      "\\W",
    ]

    const regexNegative = [
       "abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz",
       "ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ",
      "(.)\\1{1}",
      "012|123|234|345|456|567|678",
    ]

    regexPositive.forEach((regex) => {
      if (new RegExp(regex).test(password)) {
        score +=1
      }
    })
    regexNegative.forEach((regex) => {
      if(new RegExp(regex).test(password) && score > 1) {
       score -= 0.5
        console.log(score)
      }
    })

    switch (true) {
      case (score <= 1):
        passwordStrength="weak"
        break;
      case (score <=3.5):
        passwordStrength="good"
        break;
      case (score <=5):
        passwordStrength="strong"
        break;
      default:
        passwordStrength: "weak"
    }
    this.props.setPasswordStrength(passwordStrength)
  }

  validate = (e) => {
    let password  = e.target.value
    let errorMessage
    let capsCount, smallCount, numberCount, symbolCount
    if (password.length < 8) {
      this.setState({
        errorMessage: "password must be min 8 char",
      })
    }
    else {
      capsCount = (password.match(/[A-Z]/g) || []).length
      smallCount = (password.match(/[a-z]/g) || []).length
      numberCount = (password.match(/[0-9]/g) || []).length
      symbolCount = (password.match(/\W/g) || []).length
      if (capsCount < 1) {
        errorMessage = "must contain caps"
      }
      else if (smallCount < 1) {
        errorMessage = "must contain small"
      }
      else if (numberCount < 1) {
        errorMessage = "must contain number"
      }
      else if (symbolCount < 1) {
        errorMessage = "must contain symbol"
      }
      else {
        errorMessage = "Good to go!!!!"
      }
      this.setState({
        errorMessage
      })
      this.measureStrength(password)
    }
  }

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleChange = (e) => {
    this.validate(e)
    this.setState({ password: e.target.value })
  }
  render () {
    const { passwordStrength } = this.props
    const { errorMessage, showPassword, password } = this.state
    const textboxType = showPassword ? "text" : "password"
    const icon = showPassword ? "eye": "eye-slash"
    const passwordInfo = password.length > 0
      ? (
      <div className="password-info">
        <div className="progress-bar">
          <span className={`bg ${passwordStrength}`} />
        </div>
        <div>
          {errorMessage}
        </div>
        {passwordStrength}
      </div>
    )
      : null
    return (
      <div className="login-wrapper">
        <label>ENTER PASSWORD</label>
        <div className="form-input">
          <input type={textboxType} value={this.state.password} onChange={this.handleChange} />
          <FontAwesome name={icon} onClick={this.togglePassword}/>
        </div>
          {passwordInfo}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passwordStrength: state.passwordStrength
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setPasswordStrength: (passwordStrength) => {
      dispatch(setPasswordStrength(passwordStrength))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)