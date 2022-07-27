const express = require('express')
const router = express.Router()

const Post = require('../models/Post.js')

// http://localhost:5000/api/posts

// @router POST api/posts
// @desc Create new post
// @access Private
router.post('/', async(req, res) => {
    const { title, description, url, status } = req.body

    // Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: '62e0b218e99544322d4a1c1c'
        })

        await newPost.save()
        res.json({ success: true, message: 'Happy learning!', post: newPost })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router