// require('dotenv').config({ path: './config/.env' });
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');


const app = express();

app.use(express.json());

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "user",
//     database: "pomania_db",
//     port: "3306"
// })

// 
app.use("/posts", require("./routes/postRoutes"));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "c' pas bon",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// const PORT = `Listening on port ${process.env.PORT}`;
// app.listen(PORT, () => console.log("app is listening on port" + process.env.PORT));