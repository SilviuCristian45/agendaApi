import {Database} from 'sqlite3'
import {Contact} from './Contact'

export class ContactController {
    private db: Database

    constructor() {
        this.db = new Database('./contacts.db', (err) => {
            if (err)
                return console.error(err.message);
            console.log('Connected to the in-memory SQlite database.');
        });

        this.db.serialize( () =>
            this.db.run("CREATE TABLE IF NOT EXISTS contacts([id] INTEGER PRIMARY KEY,[Name] NVARCHAR(120),[Phone] NVARCHAR(30),[Description] NVARCHAR(150))")
        )
    }
    
    public getContacts(): Promise<Array<Contact>> {
        return new Promise( (resolve, reject) => {
            this.db.all("SELECT Name, Phone, Description FROM contacts", (error, rows: Array<Contact>) => {
                if (error) reject(error)
                resolve(rows)
            })
        })
    }

    public addContact(newContact: Contact): Promise<Contact> {
        return new Promise( (resolve, reject) => {
            this.db.run('INSERT INTO contacts(Name, Phone, Description) VALUES (?,?,?)', [newContact.name, newContact.phone, newContact.description], err => {
                if(err) reject(err);
                resolve(newContact);
            } )
        })
    }

    public getContact(id: number): Promise<Contact> {
        return new Promise( (resolve, reject) => {
            this.db.get('SELECT * FROM contacts WHERE id=?',[id], (err, row) => {
                if (err) reject(err)
                resolve(row as Contact)
            })
        })
    }
}