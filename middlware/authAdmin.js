const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const isAdmin = decodedToken.isAdmin;
        if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
            throw 'User ID non valable !';
        } else {
            req.token = token;
            req.user = isAdmin;
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Vous n'avez pas les droits administrateur !!!" });
    }
};
