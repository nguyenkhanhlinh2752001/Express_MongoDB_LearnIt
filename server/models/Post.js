const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: Date,
    },
    status: {
        emum: ['TO LERAN', 'LEARNING', 'LEARNED']
    },

})

module.exports = mongoose.model('Post', PostSchema)