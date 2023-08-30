const {postSchema} =  require("../schema/posts")
const mongoose = require("mongoose")


const post = mongoose.model('Post', postSchema)


module.exports = {post}