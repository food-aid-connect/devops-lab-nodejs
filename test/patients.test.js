import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Patients API', () => {
  it('GET /api/patients should return an array', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/patients should add a new patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Marie', age: 29 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Marie')
    expect(res.body.age).toBe(29)
  })

  it('POST /api/patients without age should return 400', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Marie' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/patients with an empty body should return 400', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
it('POST /api/patients without name should return 400', async () => {
  const res = await request(app)
    .post('/api/patients')
    .send({ age: 25 })

  expect(res.status).toBe(400)
  expect(res.body).toHaveProperty('error')
})
