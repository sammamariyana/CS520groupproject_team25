const request = require('supertest')
const app = require('../../backend/server')

describe('GET /api/listings', () => {
  it('returns HTTP 200', async () => {
    const res = await request(app).get('/api/listings')
    expect(res.status).toBe(200)
  })

  it('returns an array of listings', async () => {
    const res = await request(app).get('/api/listings')
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('each listing has required fields', async () => {
    const res = await request(app).get('/api/listings')
    const listing = res.body[0]
    expect(listing).toHaveProperty('id')
    expect(listing).toHaveProperty('title')
    expect(listing).toHaveProperty('price')
    expect(listing).toHaveProperty('beds')
    expect(listing).toHaveProperty('address')
  })

  it('filters by maxPrice query param', async () => {
    const res = await request(app).get('/api/listings?maxPrice=800')
    expect(res.status).toBe(200)
    res.body.forEach(l => expect(l.price).toBeLessThanOrEqual(800))
  })

  it('filters by beds query param', async () => {
    const res = await request(app).get('/api/listings?beds=2')
    expect(res.status).toBe(200)
    res.body.forEach(l => expect(l.beds).toBe(2))
  })
})
