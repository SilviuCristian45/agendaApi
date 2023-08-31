import { Contact } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

export class ContactController {
    private db: PrismaClient

    constructor() {
        this.db = new PrismaClient()
    }
    
    public async getContacts(): Promise<Array<Contact>> {
        return this.db.contact.findMany()
    }

    public async addContact(newContact: Contact): Promise<Contact> {
       await this.db.contact.create({data: newContact})
       return newContact
    }

    public async getContact(id: number): Promise<Contact | null> {
        return this.db.contact.findFirst({where: {id: id}})
    }
}