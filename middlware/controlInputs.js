const Joi = require('joi');

////Vérification et Validation des données utilisateur////

//1//Enregistrement d'un nouvel utilisateur (nom, email, password "données invalides"),
const signUpSchema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),
});
exports.newUser = (req, res, next) => {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
        res.status(428).json({ error: "Informations de création de compte invalides !!!" });
    } else {
        next();
    }
};


//2//Connexion d'un utilisateur (email, password "invalide"),
const signInSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),

});
exports.loginUser = (req, res, next) => {
    const { error, value } = signInSchema.validate(req.body);
    if (error) {
        res.status(401).json({ error: "Informations de connexions invalides !!!" });
    } else {
        next();
    }
};

//3//Vérifier l'id (id "invalide") pour s'assurer de l'identité de la personne qui fait la requête,
const idSchema = Joi.string().integer().positive().required();
exports.idUser = (req, res, next) => {
    const { error, value } = idSchema.validate(req.params.id);
    if (error) {
        res.status(401).json({ error: "id utilisateur invalide !!!" });
    } else {
        next();
    }
};

//4//Changement de mot de passe,
const passwordSchema = Joi.object({
    oldPassword: Joi.string().trim().min(10).required(),
    newPassword: Joi.string().trim().min(10).required(),
});
exports.modifyToPasswd = (req, res, next) => {
    const { error, value } = passwordSchema.validate(req.body.password);
    if (error) {
        res.status(401).json({ error: "Le mot de passe n'est pas assez fort !!!" });
    } else {
        next();
    }
};

//5//Validation de la publication d'un post.
const postSchema = Joi.string().trim();
exports.postContent = (req, res, next) => {
    if (req.body.content) {
        const { error, value } = postSchema.validate(req.body.content);
        if (error) {
            res.status(422).json({ error: "Le texte saisie n'est pas valide !!!" });
        } else {
            next();
        }
    } else if (!req.body.content && !req.file) {
        res.status(422).json({ error: "Envoyer au moins une image ou du texte !!!" });
    } else {
        next();
    }
};

//6//Validation de la publication d'un commentaire.
const comentSchema = Joi.object({
    postId: Joi.string().integer().positive().required(),
    content: Joi.string().trim().required(),
});
exports.postContent = (req, res, next) => {
    const { error, value } = comentSchema.validate(req.body.content);
    if (error) {
        res.status(422).json({ error: "Le texte saisie n'est pas valide !!!" });
    } else {
        next();
    }
};





//4//Des données de recherche,
//5//Description utilisateur,
//7//Publication / modification  d'un "post" /"commentaire"/notification,
//8//Attribution ou retrait des droits administrateurs "locaux",
//8//Attribution ou retrait des droits administrateurs "réseaux",
//8//Attribution ou retrait des droits de modération des "publications",
//9//Récupérations des commentaires d'un post,
//10//Noter la publication (like/dislike). ex : Ne pas pouvoir liker plusieurs fois le même post.


const xxxxxx = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),

});
exports.xxxxxx = (req, res, next) => {
    const { error, value } = xxxxx.validate(req.body);
    if (error) {
        res.status(401).json({ error: "xxxxx !!!" });
    } else {
        next();
    }
};