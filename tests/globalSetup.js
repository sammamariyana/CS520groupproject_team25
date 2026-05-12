// Runs once before all test suites — seeds the backend database
const { execSync } = require('child_process')
const path = require('path')

module.exports = async function globalSetup() {
  execSync('node seed.js', {
    cwd: path.join(__dirname, '../backend'),
    stdio: 'ignore',
  })
}
