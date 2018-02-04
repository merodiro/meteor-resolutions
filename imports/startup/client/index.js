import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { ApolloLink, from } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from '../../ui/App'

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
})

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken()
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token
    }
  }))
  return forward(operation)
})

const cache = new InMemoryCache()
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache
})

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app')
  )
})
