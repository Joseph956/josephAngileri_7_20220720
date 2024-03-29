//gestion des fichiers entrant dans une requête http.
const multer = require('multer');

//dictionnaire d'extension.
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
};

//Indique à multer ou enregistrer les fichiers entrant.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); //Enregistre les images dans le sous dossier "images"
    },
    filename: (req, file, callback) => {
        //Multer utilise le nom d'origine, remplace les espaces et ajoute un timetamp.
        const name = file.originalname.split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + "_" + Date.now() + '.' + extension);
    }
});

//export multer en passant la cste "storage" 
//en précisant le type de fichier qui sont gérés.
module.exports = multer({ storage: storage }).single('image');