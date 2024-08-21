import { prisma } from '@/utils/db.utils'
import { NextRequest } from 'next/server'

// create GET service to return the list of countries
export async function GET(
  req: NextRequest,
  { params }: { params: { externalCountryId: string } }
) {
  const externalCountryId = parseInt(params?.externalCountryId)
  try {
    const country = await prisma.countryApi.findFirst({
      where: {
        externalCountryId,
      },
      include: {
        states: {
          select: {
            id: true,
            externalStateId: true,
            name: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(country), {
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
