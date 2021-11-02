// const mysql = require('mysql2');
const dbGroupomania = require('../config/db');

class Post {
    constructor(id, attachment, title, content, likes) {
        this.id = id;
        this.attachment = attachment;
        this.title = title;
        this.content = content;
        this.likes = likes;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO posts(
            id,
            attachment,
            title,
            content,
            likes,
        )
        VALUES(
            '${this.id}',
            '${this.attachment}',
            '${this.title}',
            '${this.content}',
            '${this.likes}',
            '${createdAtDate}'
        )
        `;

        return dbGroupomania.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM posts;";
        console.log(posts);

        return dbGroupomania.execute(sql);
    }

    static finById(id) {
        let sql = `SELECT * FROM posts WHERE id = ${id};`;

        return dbGroupomania.execute(sql);
    }
};

module.exports = Post;