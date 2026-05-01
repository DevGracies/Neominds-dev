import express from 'express'
import { createComplaint, getComplaints } from '../controllers/complaint.controller.js'

const complaintRouter = express.Router()

complaintRouter.post('/',  createComplaint)
complaintRouter.get('/', getComplaints)


export default complaintRouter