const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const locations = [
  { name: 'United States', value: 'us' },
  { name: 'United Kingdom', value: 'uk' },
  { name: 'Canada', value: 'ca' },
  { name: 'Singapore', value: 'sg' },
  { name: 'South Korea', value: 'kr' },
  { name: 'Germany', value: 'de' },
  { name: 'Australia', value: 'au' },
  { name: 'Japan', value: 'jp' },
  { name: 'China', value: 'cn' },
  { name: 'India', value: 'in' },
  { name: 'Netherlands', value: 'nl' },
  { name: 'France', value: 'fr' },
  { name: 'United Arab Emirates', value: 'ae' },
  { name: 'Switzerland', value: 'ch' },
  { name: 'Russia', value: 'ru' },
  { name: 'Spain', value: 'es' },
  { name: 'Italy', value: 'it' },
  { name: 'Brazil', value: 'br' },
  { name: 'Sweden', value: 'se' },
  { name: 'Mexico', value: 'mx' },
  { name: 'South Africa', value: 'za' },
  { name: 'Turkey', value: 'tr' },
  { name: 'Israel', value: 'il' },
  { name: 'Hong Kong', value: 'hk' },
  { name: 'New Zealand', value: 'nz' },
  { name: 'Belgium', value: 'be' },
  { name: 'Ireland', value: 'ie' },
  { name: 'Austria', value: 'at' },
  { name: 'Indonesia', value: 'id' },
  { name: 'Philippines', value: 'ph' },
  { name: 'Vietnam', value: 'vn' },
  { name: 'Thailand', value: 'th' },
  { name: 'Malaysia', value: 'my' },
  { name: 'Saudi Arabia', value: 'sa' },
  { name: 'Norway', value: 'no' },
  { name: 'Denmark', value: 'dk' },
  { name: 'Finland', value: 'fi' },
  { name: 'Poland', value: 'pl' },
  { name: 'Ukraine', value: 'ua' },
  { name: 'Czech Republic', value: 'cz' },
  { name: 'Romania', value: 'ro' },
  { name: 'Argentina', value: 'ar' },
  { name: 'Nigeria', value: 'ng' },
  { name: 'Egypt', value: 'eg' },
  { name: 'Kenya', value: 'ke' },
  { name: 'Morocco', value: 'ma' },
  { name: 'Pakistan', value: 'pk' },
  { name: 'Bangladesh', value: 'bd' },
  { name: 'Iraq', value: 'iq' },
  { name: 'Iran', value: 'ir' },
  { name: 'Lebanon', value: 'lb' },
  { name: 'Jordan', value: 'jo' },
  { name: 'Portugal', value: 'pt' },
  { name: 'Greece', value: 'gr' },
  { name: 'Hungary', value: 'hu' },
  { name: 'Slovakia', value: 'sk' },
  { name: 'Bulgaria', value: 'bg' },
  { name: 'Croatia', value: 'hr' },
  { name: 'Serbia', value: 'rs' },
  { name: 'Bosnia and Herzegovina', value: 'ba' },
  { name: 'Montenegro', value: 'me' },
  { name: 'Albania', value: 'al' },
  { name: 'Kosovo', value: 'xk' },
  { name: 'North Macedonia', value: 'mk' },
  { name: 'Slovenia', value: 'si' },
  { name: 'Luxembourg', value: 'lu' },
  { name: 'Belarus', value: 'by' },
  { name: 'Afghanistan', value: 'af' },
  { name: 'Syria', value: 'sy' },
]

async function main() {
  await prisma.location.createMany({
    data: locations,
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
