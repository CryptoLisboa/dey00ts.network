const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const languages = [
  { name: 'English' },
  { name: 'Chinese' },
  { name: 'Spanish' },
  { name: 'Japanese' },
  { name: 'Korean' },
  { name: 'German' },
  { name: 'Russian' },
  { name: 'French' },
  { name: 'Portuguese' },
  { name: 'Hindi' },
  { name: 'Arabic' },
  { name: 'Turkish' },
  { name: 'Dutch' },
  { name: 'Indonesian' },
  { name: 'Italian' },
]

async function main() {
  await prisma.language.createMany({
    data: languages,
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
