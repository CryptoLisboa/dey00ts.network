const { exec } = require('child_process')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env.migration'),
})

// Source database credentials
const SOURCE_DB_NAME = process.env.SOURCE_DB_NAME
const SOURCE_DB_USER = process.env.SOURCE_DB_USER
const SOURCE_DB_HOST = process.env.SOURCE_DB_HOST
const SOURCE_DB_PORT = process.env.SOURCE_DB_PORT
const SOURCE_DB_PASSWORD = process.env.SOURCE_DB_PASSWORD

// Target database credentials
const TARGET_DB_NAME = process.env.TARGET_DB_NAME
const TARGET_DB_USER = process.env.TARGET_DB_USER
const TARGET_DB_HOST = process.env.TARGET_DB_HOST
const TARGET_DB_PORT = process.env.TARGET_DB_PORT
const TARGET_DB_PASSWORD = process.env.TARGET_DB_PASSWORD

// Dump file path
const DUMP_FILE = path.resolve(__dirname, 'source_db.dump')

// Function to execute a shell command and return it as a promise
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      { env: { ...process.env, PGPASSWORD: TARGET_DB_PASSWORD } },
      (error, stdout, stderr) => {
        if (error) {
          console.warn(error)
          reject(stderr)
        }
        resolve(stdout ? stdout : stderr)
      }
    )
  })
}

async function migrateDatabase() {
  try {
    // console.log('resetting the target database using Prisma...')
    // await execShellCommand('node prisma/scripts/reset-db.js')

    // console.log('creating dump of the source database...')
    // await execShellCommand(
    //   `pg_dump -U ${SOURCE_DB_USER} -h ${SOURCE_DB_HOST} -p ${SOURCE_DB_PORT} -d ${SOURCE_DB_NAME} -F c -b -v -f ${DUMP_FILE}`
    // )

    console.log('restoring dump to the target database...')
    await execShellCommand(
      `pg_restore -U ${TARGET_DB_USER} -h ${TARGET_DB_HOST} -p ${TARGET_DB_PORT} -d ${TARGET_DB_NAME} -v ${DUMP_FILE}`,
      { env: { PGPASSWORD: TARGET_DB_PASSWORD } }
    )

    console.log('data migration completed successfully.')
  } catch (error) {
    console.error('error during migration:', error)
  }
}

migrateDatabase()
