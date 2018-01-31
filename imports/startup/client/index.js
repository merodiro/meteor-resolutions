import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from '../../ui/App'

const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql')
})

const cache = new InMemoryCache()
const client = new ApolloClient({
    link: httpLink,
    cache
})

Meteor.startup(() => {
    render((
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    ), document.getElementById('app'))
})
