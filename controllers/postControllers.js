const Post = require('../models/post');

exports.getAllPosts = async (req, res, next) => {
    res.send('Get all posts route');
};

exports.createNewPost = async (req, res, next) => {
    let { title, body } = req.body;
    let post = new Post(title, body);

    post = await post.save();

    console.log(post);

    res.send('Create new post route');
};

exports.getPostById = async (req, res, next) => {
    res.send('Get post by id route');
};