import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPasswordStrength } from '../../action'
import style from './style.scss'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      errorMessage: '',
    }
  }
  measureStrength = (password) => {
    let score = 0
    let passwordStrength
    let regexPositive = [
      "[A-Z]",
      "[a-z]",
      "[0-9]",
      "\\W",
    ]
    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(password)) {
        score +=1
      }
    })
    switch (score) {
      case 0:
      case 1:
        passwordStrength="weak"
        break;
      case 2:
      case 3:
        passwordStrength="good"
        break;
      case 4:
      case 5:
        passwordStrength="strong"
        break;
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
      this.setState({
        errorMessage
      })
      this.measureStrength(password)
    }
  }
  handleChange = (e) => {
    this.validate(e)
    this.setState({ password: e.target.value })
  }
  render () {
    const { passwordStrength } = this.props
    const { errorMessage } = this.state
    return (
      <div className="login-wrapper">
        <br />
        <input type="text" value="Username" />
        <input type="password" value={this.state.password} onChange={this.handleChange} />
        <br />
        {errorMessage}
        <br/>
        {passwordStrength}
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