import { Request, Response } from 'express'
import Complaint from '../models/complaint.model.js'

const createComplaint = async (req: Request, res: Response) => {
  try {
    const { employee, role, text, date, status } = req.body

    if (!employee || !role || !text ) {
        return res.status(400).json({ message: 'Employee, role and text are required' })
    }
    const complaint = await Complaint.create({employee, role, text, date, status: status || 'Pending' })
    res.status(201).json(complaint)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

const getComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await Complaint.find()
    res.status(200).json(complaints)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
export { createComplaint, getComplaints }