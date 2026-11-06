import express from 'express'
const router = express.Router()

const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]

// GET all patients
router.get('/api/patients', (req, res) => {
  res.status(200).json(patients)
})

// POST a new patient
router.post('/api/patients', (req, res) => {
  const { name, age } = req.body

  if (!name || !age) {
    return res.status(400).json({
      error: 'Missing required fields'
    })
  }

  const newPatient = {
    id: patients.length + 1,
    name,
    age
  }

  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
