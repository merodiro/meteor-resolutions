import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Meteor } from 'meteor/meteor'


import ResolutionForm from './ResolutionForm'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const App = ({ data: {loading, resolutions} }) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <RegisterForm />
      <LoginForm />
      <ResolutionForm />
      <button onClick={() => Meteor.logout()}>Logout</button>
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  )
}

App.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    resolutions: PropTypes.array
  })
}

App.defaultProps = {
  data: {
    loading: false,
    resolutions: []
  }
}

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`

export default graphql(resolutionsQuery)(App)
