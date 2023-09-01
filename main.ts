import {Express, Request, Response } from 'express'
import express from 'express'
import { ContactController } from './ContactController'
import { Contact } from './Contact'
import bodyParser, { BodyParser } from 'body-parser'
import {errorMiddleware} from './middlewares/errormiddleware'
import RoutesConstants from './Utils'
import {FirebaseImageStorage} from './firebase'
import cors from 'cors'
import multer from 'multer';
import { NextFunction } from 'connect'

const app: Express = express()
const contactController = new ContactController()
const firebaseImageStorageService = new FirebaseImageStorage()
const upload = multer()

const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(cors())
app.use(errorMiddleware)
app.use(cors())

app.get(RoutesConstants.getContacts, async (req: Request, res: Response) => {
  const contacts = await contactController.getContacts()
  res.json(contacts)
})

app.post(RoutesConstants.addContact, upload.single('imagine'), async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.file)
  const imageURL = await firebaseImageStorageService.uploadImageToFirebase(req.file)
  const newContact = await contactController.addContact({
    ...req.body,
    Image: imageURL
  })
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