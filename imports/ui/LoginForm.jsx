import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

class LoginForm extends Component {
  login = e => {
    e.preventDefault()
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error)
      if (!error) {
        this.props.client.resetStore()
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <button type="submit">Login user</button>
      </form>
    )
  }
}

export default LoginForm
