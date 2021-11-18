const db = require("../models");
const Post = db.posts;
const dotenv = require('dotenv');
dotenv.config();


//Lister tous les posts.
exports.findAllPublished = async (req, res) => {
    Post.findAll({
        include: [
            {
                model: db.user,
            }
        ],
        order: [["createdAt", "DESC"]],
    }).then(post => {
        res.status(200).json(post);
    }).catch((err) => {
        res.status(400).json({
            message:
                err.message ||
                "Une erreur s'est produite lors de la récupération des publications.",
        });
    });
};

//Récupérer un seul post.
exports.getPostById = async (req, res, next) => {
    console.log("---->CONTENU: getPostById");
    console.log(getPostById);
    // try {
    //     const { postId } = req.params.id;
    //     console.log(postId);
    //     const Post = await models.Post.findOne({
    //         where: { id: req.body.postId },
    //         include: [
    //             {
    //                 model: models.Comment,
    //                 as: 'comments',
    //                 include: [
    //                     {
    //                         model: models.User,
    //                         as: 'author',
    //                     }
    //                 ]
    //             },
    //             {
    //                 model: models.User,
    //                 as: 'author'
    //             }
    //         ]
    //     });
    //     if (Post) {
    //         return res.status(200).json({ Post });
    //     }
    //     return res.status(404).send('Post with the specified ID does not exists');
    // } catch (error) {
    //     return res.status(500).send({ error, message: "erreur du serveur !!!" });
    // }
    // };
    console.log("--->CONTENU: req.body.post");
    console.log(req.body.post);
    console.log({ _id: req.params.id });
    console.log("---->CONTENU: req.body");
    Post.sync({ alter: true }).then(() => {
        return Post.findOne({
            where: { id: req.body },
            attributes: [['id', 'postId']],
            include: [
                {
                    model: db.user,
                }
            ],
            post: req.params.id
        });
    }).then((result) => {
        res.status(200).json(result);
        console.log(result);
    }).catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};


//Créer un nouveau post.
exports.create = async (req, res, next) => {
    console.log("--->CONTENU: req.body.post");
    console.log(req.body.post);
    console.log({ _id: req.params.id });
    console.log("---->CONTENU: req.body");
    Post.create({
        id: req.body.post,
        content: req.body.content,
        include: [
            {
                model: db.user,
            }
        ],
    }).then((post) => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error, message: "Le post n'a pas été créé !!!" })
    });
};

//Modifier un post.
exports.modifyPostById = async (req, res, next) => {
    console.log("---->ROUTE modifyPostById");
    console.log(req.params.id);
    console.log({ _id: req.params.id });
    console.log("---->CONTENU: req.body");
    console.log(req.body);

    // Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    //     .then(() => res.status(200).json({ message: "le post à été modifié !!!" }))
    //     .catch(error => res.status(400).json({ error }));
    Post.sync({ alter: true }).then(() => {
        return Post.update({
            where: { _id: id.params.id },
            content: req.body.content,
            include: [
                {
                    model: db.post,
                }
            ],
        });
    }).then((post) => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(400).json({ error: "Le post n'a pas été modifié !!!" })
    });
    res.send('Modifier un post utilisateur par son id !!!');
};

// Supprimer un post.
exports.deletePostById = async (req, res, next) => {

    res.send('Supprimer un post utilisateur par son id !!!');
};