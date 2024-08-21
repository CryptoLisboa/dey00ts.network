import { prisma } from '@/utils/db.utils'

// create GET service to return the list of countries
export async function GET() {
  try {
    const countries = await prisma.countryApi.findMany({
      select: {
        id: true,
        externalCountryId: true,
        name: true,
        iso2: true,
        latitude: true,
        longitude: true,
      },
    })

    return new Response(JSON.stringify(countries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
