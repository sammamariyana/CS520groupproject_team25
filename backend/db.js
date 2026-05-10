const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, 'data.json')

const EMPTY_DB = {
  users: [],
  listings: [],
  roommateProfiles: [],
  savedListings: [],
  savedRoommates: [],
  reports: [],
}

function read() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_DB, null, 2))
    return structuredClone(EMPTY_DB)
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

module.exports = { read, write }
