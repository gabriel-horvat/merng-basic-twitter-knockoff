const User = require('../../models/User')

module.exports = {
    Mutation: {
        register(_, args, context, info){
            // validate user data
            // make sure user does not exist already
            // hash password and create auth token
        }
    }
}