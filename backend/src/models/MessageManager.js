const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
    constructor() {
        super({ table: "messages" });
    }

    send(messages) {
        return this.database.query(`insert into ${this.table} (content, id_sender, id_receiver, id_request) values (?,?,?,?)`, [
            messages.content,
            messages.id_sender,
            messages.id_receiver,
            messages.id_request,]);
    }

    update(messages) {
        return this.database.query(
            `UPDATE ${this.table} SET content = ? WHERE id = ?`,
            [messages.content, messages.id]
        );
    }
    // Dans MessageManager.js
    read(id_request) {
        return this.database.query(
            `SELECT 
            messages.content, 
            messages.created_at, 
            users.firstname, 
            users.lastname 
         FROM ${this.table}
         JOIN users ON messages.id_sender = users.id 
         WHERE messages.id_request = ? 
         ORDER BY messages.created_at ASC`,
            [id_request]
        );
    }

}
module.exports = MessageManager;
