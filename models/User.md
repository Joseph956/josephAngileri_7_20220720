// const mysql = require('mysql2');
const dbGroupomania = require('../config/db');

// class users {
//     constructor(id, firstname, lastname, email, password, created_at, updated_at, admin) {
//         this.id = id;
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.email = email;
//         this.password = password;
//         this.created_at = new Date();
//         this.updated_at = new Date();
//         this.admin = admin;
//     }
// };

const User = (user) => {
    this.id = id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
}

User.getAllUsers = (result) => {
    dbGroupomania.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('impossible de récupérer la liste utilisateurs');
            result(null, err);
        } else {
            console.log('Voici votre liste');
            result(null, res);
        }
    })
};

module.exports = User;