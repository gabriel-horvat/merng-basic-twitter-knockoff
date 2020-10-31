const { UserInputError, AuthenticationError } = require('apollo-server')
const Post = require('../../models/Post')
const auth = require('../../utils/auth')

module.exports = {
    Mutation: {
        createComment: async(_, {postId, body}, context) => {
            const user = auth(context)
            if (body.trim() === '') {
                throw UserInputError('empty comment', {
                    errors: {
                        body: 'comment body cant be empty'
                    }
                })
            }

            const post = await Post.findById(postId)

            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            }
            else throw new UserInputError('post not found')

        },
        async deleteComment(_, {postId, commentId}, context){
            const {username} = auth(token)
            const post = await Post.findById(postId)
            
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId)
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                }
                else{
                    throw new AuthenticationError('action not permitted')
                }
            } else{
                throw new UserInputError('post not found')
            }
        }

    }
}