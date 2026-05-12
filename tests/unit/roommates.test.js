const request = require('supertest')
const app = require('../../backend/server')

describe('GET /api/roommates', () => {
  it('returns HTTP 200', async () => {
    const res = await request(app).get('/api/roommates')
    expect(res.status).toBe(200)
  })

  it('returns an array of roommate profiles', async () => {
    const res = await request(app).get('/api/roommates')
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('each profile has required fields', async () => {
    const res = await request(app).get('/api/roommates')
    const profile = res.body[0]
    expect(profile).toHaveProperty('id')
    expect(profile).toHaveProperty('userId')
    expect(profile).toHaveProperty('budget')
    expect(profile).toHaveProperty('sleep')
    expect(profile).toHaveProperty('name')
  })

  it('profiles include joined user name and social fields', async () => {
    const res = await request(app).get('/api/roommates')
    const profile = res.body[0]
    expect(typeof profile.name).toBe('string')
    expect(profile).toHaveProperty('social')
  })
})
