import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'
import { Meteor } from 'meteor/meteor'

import ResolutionForm from './ResolutionForm'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`

@graphql(resolutionsQuery)
@withApollo
class App extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      resolutions: PropTypes.array
    }),
    client: PropTypes.object
  }

  static defaultProps = {
    data: {
      loading: false,
      resolutions: []
    }
  }

  logout = () => {
    Meteor.logout()
    this.props.client.resetStore()
  }

  render() {
    const { data: { loading, resolutions }, client } = this.props
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
        <RegisterForm client={client} />
        <LoginForm client={client} />
        <ResolutionForm />
        <ul>
          {resolutions.map(resolution => (
            <li key={resolution._id}>{resolution.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
