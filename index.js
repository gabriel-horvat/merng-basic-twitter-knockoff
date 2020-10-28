const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')


const {MONGODB} = require('./config.js')
const Post = require('./models/Post')

const typeDefs = gql`
type Query {
    getPosts
}
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('you are connected successfully my dude :)');
    return server.listen({port: 5000})
})
.then((res) => {
    console.log(`server running at ${res.url}`)
})

