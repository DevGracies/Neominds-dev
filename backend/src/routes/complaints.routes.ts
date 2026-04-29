import express from 'express'
import { createComplaint, getComplaints } from '../controllers/complaint.controller.js'
import validateComplaint from '../middlewares/complaint-validator.js'

const complaintRouter = express.Router()

complaintRouter.post('/complaints', validateComplaint, createComplaint)
complaintRouter.get('/complaints', validateComplaint ,getComplaints)


export default complaintRouter