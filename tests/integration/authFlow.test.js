const request = require('supertest')
const app = require('../../backend/server')

const uniqueEmail = `integration_${Date.now()}@umass.edu`

describe('Register form submission', () => {
  it('POST /api/auth/register returns token and user object', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Origin', 'http://localhost:5173')
      .set('Content-Type', 'application/json')
      .send({ name: 'Integration User', email: uniqueEmail, password: 'password123' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toHaveProperty('id')
    expect(res.body.user.email).toBe(uniqueEmail)
  })

  it('returned token is a valid JWT string', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'JWT Test', email: `jwt_${Date.now()}@umass.edu`, password: 'password123' })

    const parts = res.body.token.split('.')
    expect(parts.length).toBe(3)
  })
})

describe('Login form submission', () => {
  it('POST /api/auth/login returns token and user info', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Origin', 'http://localhost:5173')
      .set('Content-Type', 'application/json')
      .send({ email: 'shivanshsoni@umass.edu', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user.name).toBe('Shivansh Soni')
    expect(res.body.user.email).toBe('shivanshsoni@umass.edu')
  })

  it('token from login can be used to access protected route GET /api/auth/me', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'shivanshsoni@umass.edu', password: 'password123' })

    const token = loginRes.body.token

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)

    expect(meRes.status).toBe(200)
    expect(meRes.body.email).toBe('shivanshsoni@umass.edu')
  })

  it('accessing protected route without token returns 401', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })
})
