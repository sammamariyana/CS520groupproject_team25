const request = require('supertest')
const app = require('../../backend/server')

const testEmail = `testuser_${Date.now()}@umass.edu`
const testPassword = 'password123'

describe('POST /api/auth/register', () => {
  it('registers a new user and returns a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: testEmail, password: testPassword })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.email).toBe(testEmail)
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('rejects a non-.edu email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bad User', email: 'student@gmail.com', password: testPassword })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('rejects a duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Dup User', email: testEmail, password: testPassword })

    expect(res.status).toBe(409)
    expect(res.body).toHaveProperty('error')
  })

  it('rejects a short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: `short_${Date.now()}@umass.edu`, password: '123' })

    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/login', () => {
  it('logs in the demo user and returns a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'shivanshsoni@umass.edu', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.name).toBe('Shivansh Soni')
    expect(res.body.user).not.toHaveProperty('passwordHash')
  })

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'shivanshsoni@umass.edu', password: 'wrongpassword' })

    expect(res.status).toBe(401)
  })

  it('rejects unknown email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@umass.edu', password: 'password123' })

    expect(res.status).toBe(401)
  })
})
