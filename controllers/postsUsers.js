const { post } = require('../app');
const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await post.findAll();
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {

    try {
        let postId = req.params.id;

        let [post, _] = await Post.findById(postId);
        res.status(200).json({ post: post[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewPost = async (req, res, next) => {
    try {
        let { content, createdAt, updatedAt, userId, title } = req.body;
        let post = new Post(content, createdAt, updatedAt, userId, title);
        post = await post.save();
        console.log(post);
        res.status(201).json({ message: "Le post est créé" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.modifyPostById = async (req, res, next) => {

    res.send('Modifier un post utilisateur par son id !!!');
};

exports.deletePostById = async (req, res, next) => {

    res.send('Supprimer un post utilisateur par son id !!!');
};