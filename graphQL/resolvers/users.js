const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')
const { extendResolversFromInterfaces } = require('apollo-server')
const {UserInputError} = require('apollo-server')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')

function generateToken(user){
    return jwt.sign(
        {
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
    {expiresIn: '1h'}
    )
}

module.exports = {
    Mutation: {

        async login(
            _, 
            {
                 username, password
            }
              ){
            // validate user data
            const {valid, errors} = validateLoginInput(username, password)
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const user = await User.findOne({username})

            if (!user) {
                errors.general = 'user not found'
                throw new UserInputError(' username not found', {errors})
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'password wrong'
                throw new UserInputError('Wrong password', {errors})

            }
            const token = generateToken(user) 
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },


        async register(
            _, 
            {
                registerInput: {username, email, password, confirmPassword }
            },
              ){
            // validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword )
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            // make sure user does not exist already
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken '
                    }
                })
            }
            // hash password and create auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()
            const token = generateToken(res) 

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}