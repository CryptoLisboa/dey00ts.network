const { PrismaClient } = require('@prisma/client')
const fs = require('fs/promises')
const path = require('path')

const prisma = new PrismaClient()

function chunkArray(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function getCountries() {
  const filePath = path.join(__dirname, 'countries+states+cities.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

async function upsertCountries({ countries }) {
  console.log('Uploading countries...')
  const batchSize = 50 // number of countries to batch in each transaction
  const countryChunks = chunkArray(countries, batchSize)
  const countryApiInstances = []

  for (const countryChunk of countryChunks) {
    const countryUpserts = countryChunk.map((country) => ({
      where: { externalCountryId: country.id },
      update: {},
      create: {
        externalCountryId: country.id,
        name: country.name,
        iso3: country.iso3,
        iso2: country.iso2,
        region: country.region,
        externalRegionId: parseInt(country.region_id),
        subregion: country.subregion,
        externalSubRegionId: parseInt(country.subregion_id),
        latitude: parseFloat(country.latitude),
        longitude: parseFloat(country.longitude),
        emoji: country.emoji,
      },
    }))

    try {
      const results = await prisma.$transaction(
        countryUpserts.map((upsert) => prisma.countryApi.upsert(upsert))
      )
      countryApiInstances.push(...results)
    } catch (error) {
      const continueTypeOfError =
        'constraint failed on the fields: (`externalCountryId`)'
      if (error.message.includes(continueTypeOfError)) {
        console.warn('Skipping country with error:', error?.message)
      } else {
        throw error
      }
    }
  }

  return countryApiInstances
}

async function upsertStates({ country, createdCountry }) {
  console.log(`Uploading states for country: ${createdCountry.name}`)
  const stateUpserts = country.states.map((state) => ({
    where: { externalStateId: state.id },
    update: {},
    create: {
      externalStateId: state.id,
      name: state.name,
      iso2: state.state_code,
      stateCode: state.state_code,
      country: {
        connect: { id: createdCountry.id },
      },
    },
  }))

  const batchSize = 50
  const stateUpsertChunks = chunkArray(stateUpserts, batchSize)
  const stateApiInstances = []

  for (const stateUpsertChunk of stateUpsertChunks) {
    try {
      const results = await prisma.$transaction(
        stateUpsertChunk.map((upsert) => prisma.stateApi.upsert(upsert))
      )
      stateApiInstances.push(...results)
    } catch (error) {
      throw error
    }
  }

  console.log(`Uploaded states for country: ${country.name}`)

  return stateApiInstances
}

async function upsertCities({ state, createdState, createdCountry }) {

  const MAX_CONNECTIONS = 15
  const batchSize = Math.ceil(state.cities.length / MAX_CONNECTIONS) // number of cities to batch in each transaction
  const cityChunks = chunkArray(state.cities, batchSize)
  console.log(
    `Uploading cities for state: ${state.name} with externalStateId: ${state.id} of country: ${createdCountry.name} with externalCountryId: ${createdCountry.externalCountryId} with batchSize: ${batchSize} with ${cityChunks.length} chunks`
  )

  const start = Date.now()

  const upsertPromises = cityChunks.map(async (cityChunk) => {
    const cityUpserts = cityChunk.map((city) => ({
      where: { externalCityId: city.id },
      update: {},
      create: {
        externalCityId: city.id,
        name: city.name,
        latitude: parseFloat(city.latitude),
        longitude: parseFloat(city.longitude),
        state: {
          connect: { id: createdState.id },
        },
        country: {
          connect: { id: createdCountry.id },
        },
      },
    }))

    try {
      await prisma.$transaction(
        cityUpserts.map((upsert) => prisma.cityApi.upsert(upsert))
      )
    } catch (error) {
      const continueTypeOfError =
        'constraint failed on the fields: (`externalCountryId`)'
      if (error.message.includes(continueTypeOfError)) {
        console.warn('Skipping city with error:', error?.message)
      } else {
        throw error
      }
    }
  })

  console.log(`Upserting cities ${state.cities.length}`)

  await Promise.all(upsertPromises)
  const end = Date.now()
  console.log(`Uploaded cities in ${end - start}ms`)
}

// Uploading cities for state: Ouest of country: Haiti

async function main() {
  console.log('Loading countries from file...')
  const countries = await getCountries()

  console.log('Starting upload process...')

  // const countryApiInstances = await upsertCountries({ countries })

  let hasFoundLastCountry = false
  let hasFoundLastState = false
  for (const country of countries) {
    if (country.id === 107) {
      hasFoundLastCountry = true
    }
    if (!hasFoundLastCountry) {
      continue
    }
    const createdCountry = await prisma.countryApi.findUnique({
      where: { externalCountryId: country.id },
    })
    // const createdCountry = countryApiInstances.find(
    //   (instance) => instance.externalCountryId === country.id
    // )
    // const stateApiInstances = await upsertStates({ country, createdCountry })

    for (const state of country.states) {
      if (state.id === 1718) {
        hasFoundLastState = true
      }
      if (!hasFoundLastState) {
        continue
      }
      const createdState = await prisma.stateApi.findUnique({
        where: { externalStateId: state.id },
      })
      const hasAllArgs = createdState && createdCountry && state
      if (!hasAllArgs) {
        continue
      }
      await upsertCities({ state, createdState, createdCountry })
    }
  }
  console.log('Upload complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
