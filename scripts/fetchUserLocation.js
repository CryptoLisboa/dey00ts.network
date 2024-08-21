const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fetchAllUsers() {
  const allUsersWithLocation = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      socials: true,
      location: {
        select: {
          country: true,
          state: true,
          city: true,
          externalCountryId: true,
          externalStateId: true,
          externalCityId: true,
        },
      },
    },
  })

  const countriesInternal = await prisma.countryApi.findMany({
    select: {
      id: true,
      name: true,
      externalCountryId: true,
    },
  })

  // const headers = new Headers()
  // const apiKey =
  //   process.env.COUNTRY_STATE_CITY_API_KEY ||
  //   'bFEya0hJZmUxU0ozbDBsQm9wRWxjRWo1aTVGTjJhQ05QdHFWY3JsRA=='
  // headers.append('X-CSCAPI-KEY', apiKey)

  // const requestOptions = {
  //   method: 'GET',
  //   headers: headers,
  //   redirect: 'follow',
  // }

  // const countries = await fetch(
  //   'https://api.countrystatecity.in/v1/countries',
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => {
  //     const resultJson = JSON.parse(result)
  //     return resultJson
  //   })
  //   .catch((error) => console.log('error', error))

  // const userDataEnriched = allUsersWithLocation.map((user) => {
  //   const country = countries.find(
  //     (country) =>
  //       country?.name?.toLowerCase() === user?.location?.name?.toLowerCase()
  //   )
  //   return country
  //     ? {
  //         ...user,
  //         location: {
  //           ...user?.location,
  //           externalCountryId: country?.id,
  //         },
  //       }
  //     : user
  // })

  console.log('ABOUT TO UPDATE')

  // Batch update users in the database
  const updatePromises = allUsersWithLocation
    .map((user) => {
      if (user?.location?.externalCountryId) {
        return prisma.user.update({
          where: { id: user.id },
          data: {
            location: {
              update: {
                country: {
                  connect: {
                    id: countriesInternal.find(
                      (country) =>
                        country?.externalCountryId ===
                        user?.location?.externalCountryId
                    )?.id,
                  },
                },
              },
            },
          },
        })
      }
    })
    .filter(Boolean) // Remove undefined promises

  await Promise.all(updatePromises)

  console.log('DONE UPDATING')

  console.log(JSON.stringify(updatePromises, null, 2))
}

async function main() {
  await fetchAllUsers()

  await prisma.$disconnect()
}

main()
