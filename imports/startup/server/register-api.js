import { createApolloServer } from 'meteor/apollo'
import { Engine } from 'apollo-engine'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import ResolutionsSchema from '../../api/resolution/Resolution.graphql'
import ResolutionsResolvers from '../../api/resolution/resolvers'

const PORT = process.env.PORT || 3000

const testSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
}
`

const typeDefs = [testSchema, ResolutionsSchema]

const testResolvers = {
  Query: {
    hi() {
      return 'Hello from API'
    }
  }
}
const resolvers = merge(testResolvers, ResolutionsResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Initialize Apollo Engine
const engine = new Engine({
  engineConfig: {
    apiKey: 'service:merodiro-4894:G5lFcAjcRJ3u4wuOBxax3A',
    logging: {
      level: 'WARN' // DEBUG, INFO, WARN or ERROR
    }
  },
  graphqlPort: PORT,
  endpoint: '/graphql'
})

// engine.start()
createApolloServer(
  () => ({
    schema,
    context: {},
    tracing: true,
    cacheControl: true
  }),
  {
    configServer: graphQLServer => {
      graphQLServer.use(engine.expressMiddleware())
      // Any other config server stuff
    }
  }
)
