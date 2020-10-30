const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphQL/typeDefs')

const {MONGODB} = require('./config.js')
const resolvers = require('./graphQL/resolvers')

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

