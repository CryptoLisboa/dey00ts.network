const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:IBFuTbpDRtvONIXZcHkgZSCZSiNEExBG@viaduct.proxy.rlwy.net:43658/railway',
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