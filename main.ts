import {Express, Request, Response } from 'express'
import express from 'express'
import { ContactController } from './ContactController'
import { Contact } from './Contact'
import bodyParser, { BodyParser } from 'body-parser'

const app: Express = express()
const contactController = new ContactController()

const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req: Request, res: Response) => {
  contactController.getContacts().then(  contacts => res.json(contacts) ).catch(err => { 
    console.log(err)
    res.status(501)
  })
})

app.post('/addContact', jsonParser, (req: Request, res: Response) => {
  const newContact = req.body as Contact
  contactController.addContact(newContact).then( newContact => res.json(newContact) ).catch( err => {
    console.log(err)
    res.status(501)
  })
})

app.listen(5000, () => {
    console.log('server started on port 5000')
})