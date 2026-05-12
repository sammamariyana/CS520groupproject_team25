const request = require('supertest')
const app = require('../../backend/server')

describe('Frontend → Backend connection', () => {
  it('GET / returns API running message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('CampusNest API is running')
  })

  it('GET /api/listings is reachable from frontend origin', async () => {
    const res = await request(app)
      .get('/api/listings')
      .set('Origin', 'http://localhost:5173')

    expect(res.status).toBe(200)
  })
})

describe('CORS configuration', () => {
  it('responds to preflight OPTIONS request with 200', async () => {
    const res = await request(app)
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type,Authorization')

    expect(res.status).toBe(200)
  })

  it('includes Access-Control-Allow-Origin header', async () => {
    const res = await request(app)
      .get('/api/listings')
      .set('Origin', 'http://localhost:5173')

    expect(res.headers['access-control-allow-origin']).toBe('*')
  })

  it('includes Access-Control-Allow-Headers for Authorization', async () => {
    const res = await request(app)
      .options('/api/auth/me')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'GET')
      .set('Access-Control-Request-Headers', 'Authorization')

    expect(res.headers['access-control-allow-headers']).toContain('Authorization')
  })
})
