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

}
module.exports = MessageManager;
