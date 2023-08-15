import {Express, Request, Response } from 'express'
import express from 'express'
import { ContactController } from './ContactController'
import { Contact } from './Contact'
import bodyParser, { BodyParser } from 'body-parser'
import {errorMiddleware} from './middlewares/errormiddleware'
import RoutesConstants from './Utils'
import cors from 'cors';

const app: Express = express()
const contactController = new ContactController()

const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(errorMiddleware)
app.use(cors())

app.get(RoutesConstants.getContacts, async (req: Request, res: Response) => {
  const contacts = await contactController.getContacts()
  res.json(contacts)
})

app.post(RoutesConstants.addContact, jsonParser, async (req: Request, res: Response) => {
  const newContactBody = req.body as Contact
  console.log(req.body)
  const newContact = await contactController.addContact(newContactBody)
  res.json(newContact)
})

app.get(RoutesConstants.getContactById, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  const contact = await contactController.getContact(id)
  res.json(contact)
})

app.listen(5000, () => {
    console.log('server started on port 5000')
})