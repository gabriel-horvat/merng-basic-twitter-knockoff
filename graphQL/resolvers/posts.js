const Post = require('../../models/Post')
const auth = require('../../utils/auth')

module.exports = {
    Query: {
        // sayHi: () => 'Hello World'
        async getPosts(){
            try {
                // find posts and sort in desc order
                const posts = await Post.find().sort({ createdAt: -1})
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        async getPost(_, {postId}){
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else{
                    throw new Error('post not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, {body}, context){
const user = auth(context)
console.log(user);
const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString()
})
const post = await newPost.save()
return post
        }
    }
}