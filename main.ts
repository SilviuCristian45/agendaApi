import {Express, Request, Response } from 'express'
import express from 'express'
import { ContactController } from './ContactController'

const app: Express = express()
const contactController = new ContactController()

app.get('/', (req: Request, res: Response) => {
  res.json()
})

app.listen(5000, () => {
    console.log('server started on port 5000')
})