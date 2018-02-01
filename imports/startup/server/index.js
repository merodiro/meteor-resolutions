import { Meteor } from 'meteor/meteor';
import { createApolloServer } from 'meteor/apollo'
import { Engine } from 'apollo-engine'
import { makeExecutableSchema } from 'graphql-tools'

const PORT = process.env.PORT || 3000;

const typeDefs = `
type Query {
    hi: String
}
`
const resolvers = {
    Query: {
        hi() {
            return "Hello World"
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

// Initialize Apollo Engine
const engine = new Engine({
    engineConfig: {
        apiKey: 'service:merodiro-4894:G5lFcAjcRJ3u4wuOBxax3A',
        logging: {
            level: 'DEBUG', // DEBUG, INFO, WARN or ERROR
        },
    },
    graphqlPort: PORT,
    endpoint: '/graphql',
})

engine.start()
createApolloServer(req => ({
    schema,
    context: {},
    tracing: true,
    cacheControl: true,
}), {
    configServer: graphQLServer => {
        graphQLServer.use(engine.expressMiddleware());
        // Any other config server stuff
    },
})