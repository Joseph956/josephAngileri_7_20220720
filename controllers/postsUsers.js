const modelPost = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {

    res.send('Afficher tous les posts utilisateurs !!!');
};

exports.getPostById = async (req, res, next) => {

    res.send('Afficher un post utilisateur par son id !!!');
};

exports.createNewPost = async (req, res, next) => {
    // let { title, body } = req.body;
    // let post = new Post(title, body);

    // // post = await post.save();

    // // console.log(post);

    // // let post = new Post("First Post", "Body of first post");

    // post = await post.save();

    // console.log(post);

    res.send("Création d'un nouveau post !!!");
};

exports.modifyPostById = async (req, res, next) => {

    res.send('Modifier un post utilisateur par son id !!!');
};

exports.deletePostById = async (req, res, next) => {

    res.send('Supprimer un post utilisateur par son id !!!');
};