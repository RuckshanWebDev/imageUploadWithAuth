import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const postSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is Must']
    },
    url: {
        type: String,
        required: [true, 'Url is Must']
    }

}, {
    timestamps: true
})

const Post = mongoose.model('Posts', postSchema)
export default Post