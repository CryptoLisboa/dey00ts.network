const { exec } = require('child_process')
const path = require('path')

// Source database credentials
const SOURCE_DB_NAME = 'railway'
const SOURCE_DB_USER = 'postgres'
const SOURCE_DB_HOST = 'roundhouse.proxy.rlwy.net'
const SOURCE_DB_PORT = '12164'
const SOURCE_DB_PASSWORD = 'vZoXdpCULyWhgRnckCTXhUcAuBJBZkuO'

// Target database credentials
const TARGET_DB_NAME = 'railway'
const TARGET_DB_USER = 'postgres'
const TARGET_DB_HOST = 'viaduct.proxy.rlwy.net'
const TARGET_DB_PORT = '43658'
const TARGET_DB_PASSWORD = process.env.PGPASSWORD || 'IBFuTbpDRtvONIXZcHkgZSCZSiNEExBG'

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
