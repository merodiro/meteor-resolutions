import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

const App = () => {
  return (
    <div>
      Hello
    </div>
  )
}

Meteor.startup(() => {
    render(<App />, document.getElementById('app'))
})
