// // //packages variables environnements
const dotenv = require('dotenv');
dotenv.config();
import { Sequelize } from 'sequelize'
import { sequelize } from '../models';

export default new Sequelize('crud', 'joseph', 'mdp', { dialect: 'mysql', host: 'localhost' })

// exports.connect = () => {
//     const dbgroupomania = mysql.createConnection({
//         port: '3306',
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         charset: 'utf8_general_ci'
//     });
//     return dbgroupomania;
// };

dbgroupomania.connect(function (error) {
    if (error) throw error;
    console.log("Vous êtes connecté dbgroupomania !!!");
})

// // module.exports = dbgroupomania;

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     charset: 'utf8_general_ci',
//     waitForConnections: true,
//     connectionLimit: 8,
//     queueLimit: 0
// });

// let sql = "SELECT * FROM posts;";

// pool.execute(sql, function (err, result) {
//     if (err) throw err;

//     console.log(result);

//     // result.forEach(res => {
//     //     console.log(res.title);
//     // })

// });

// module.exports = pool.promise();



// // exports.connect = () => {
// //     const connection = mysql.createConnection({
// //         host: process.env.DB_HOST,
// //         user: process.env.DB_USER,
// //         database: process.env.DB_NAME,
// //         password: process.env.DB_PASSWORD,
// //     });
// //     return connection;
// // }