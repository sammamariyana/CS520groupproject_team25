const { randomUUID } = require('crypto')
const { read, write } = require('../db')

module.exports = {
  findAll() {
    return read().roommateProfiles
  },

  findByUserId(userId) {
    return read().roommateProfiles.find(r => r.userId === userId) ?? null
  },

  upsert(userId, fields) {
    const db = read()
    const idx = db.roommateProfiles.findIndex(r => r.userId === userId)
    if (idx === -1) {
      const profile = {
        id: randomUUID(),
        userId,
        createdAt: new Date().toISOString(),
        ...fields,
      }
      db.roommateProfiles.push(profile)
      write(db)
      return profile
    }
    db.roommateProfiles[idx] = {
      ...db.roommateProfiles[idx],
      ...fields,
      updatedAt: new Date().toISOString(),
    }
    write(db)
    return db.roommateProfiles[idx]
  },
}
