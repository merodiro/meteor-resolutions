import { Meteor } from 'meteor/meteor';
import { createApolloServer } from 'meteor/apollo'
import { Engine } from 'apollo-engine'
import { makeExecutableSchema } from 'graphql-tools'

import ResolutionsSchema from '../../api/resolution/Resolution.graphql'

const PORT = process.env.PORT || 3000;

const testSchema = `
type Query {
    hi: String
    resolutions: [Resolution]
}
`

const typeDefs = [
    testSchema,
    ResolutionsSchema
]
const resolvers = {
    Query: {
        hi() {
            return "Hello World"
        },
        resolutions() {
            return [{
                    _id: "jsfkahjak",
                    name: "Get stuff done!"
                },
                {
                    _id: "jsfkahasfak",
                    name: "Lose some weight!"
                }
            ]
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