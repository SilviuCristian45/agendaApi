import {Database} from 'sqlite3'

export class ContactController {
    private db: Database

    constructor() {
        this.db = new Database('./contacts.db', (err) => {
            if (err)
                return console.error(err.message);
            console.log('Connected to the in-memory SQlite database.');
        });
    }
    
    getContacts() {

    }
}