const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get('/allpost', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        res.status(422).json({ error: "Please add all the fields" })
    }
    //make password not show on database
    req.user.password = undefined
    const post = new Post({
        //key and value are the same so only need to type one
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})

router.get('/myposts', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router