const { randomUUID } = require('crypto')
const { read, write } = require('../db')

module.exports = {
  findByReporter(userId) {
    return read().reports.filter(r => r.reporterId === userId)
  },

  create(fields) {
    const db = read()
    const report = {
      id: randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...fields,
    }
    db.reports.push(report)
    write(db)
    return report
  },
}
