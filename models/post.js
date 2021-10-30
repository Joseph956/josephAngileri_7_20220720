// const mysql = require('mysql2');
const db = require('../config/db');

class Post {
    constructor(content, createdAt, updatedAt, userId, title) {
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.title = title;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO posts(
            content,
            createdAt,
            updatedAt,
            userId,
            title,
        )
        VALUES(
            '${this.content}',
            '${this.createdAt}',
            '${this.updatedAt}',
            '${this.userId}',
            '${this.title}',
            '${createdAtDate}'
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM posts;";

        return db.execute(sql);
    }

    static finById(id) {
        let sql = `SELECT * FROM posts WHERE id = ${id};`;

        return db.execute(sql);
    }
};

module.exports = Post;