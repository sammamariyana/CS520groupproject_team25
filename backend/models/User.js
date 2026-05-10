const { randomUUID } = require('crypto')
const { read, write } = require('../db')

module.exports = {
  findById(id) {
    return read().users.find(u => u.id === id) ?? null
  },

  findByEmail(email) {
    return read().users.find(u => u.email === email.toLowerCase()) ?? null
  },

  create(fields) {
    const db = read()
    const user = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...fields,
      email: fields.email.toLowerCase(),
    }
    db.users.push(user)
    write(db)
    return user
  },

  update(id, fields) {
    const db = read()
    const idx = db.users.findIndex(u => u.id === id)
    if (idx === -1) return null
    db.users[idx] = { ...db.users[idx], ...fields }
    write(db)
    return db.users[idx]
  },
}
