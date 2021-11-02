const Post = require('../models/posts_table');
const dbgroupomania = require('../config/config.json');
const dotenv = require('dotenv');
const { post } = require('../app');
dotenv.config();

exports.getPostsList = async (req, res, next) => {
    Post.findAll().then(
        (posts) => {
            const mappedPosts = posts.map((post) => {

                return post;
            });
            res.status(200).json(mappedPosts);
        }
    ).catch(
        () => {
            res.status(500).send(new Error('Database error'));
        }
    );



    // const connection = dbgroupomania.connect();
    // connection.execute(sql, (error) => {
    //     if (error) {
    //         connection.end();
    //         res.status(500).json({ "error": error.sqlMessage });
    //     } else {
    //         Post.findAll()
    //             .then(posts => {
    //                 res.status(200).json(posts);
    //             })
    //             .catch(error => {
    //                 res.status(400).json({ error });
    //                 next();
    //             });
    //     }
    //     connection.end();
    // });

    res.send('Afficher tous les posts de tous les utilisateurs !!!');
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
    res.send('Afficher un post utilisateur par son id !!!');
};

exports.createNewPost = async (req, res, next) => {
    try {
        let { id, attachment, title, content, likes } = req.body;
        const post = new Post(id, attachment, title, content, likes);
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