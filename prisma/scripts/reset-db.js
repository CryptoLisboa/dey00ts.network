const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function resetDatabase() {
  try {
    console.log('resetting the target database...')
    await prisma.$executeRawUnsafe('DROP SCHEMA public CASCADE')
    await prisma.$executeRawUnsafe('CREATE SCHEMA public')
    console.log('database reset successfully.')
  } catch (error) {
    console.error('error resetting database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()
