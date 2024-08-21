import { prisma } from '@/utils/db.utils'
import { NextRequest } from 'next/server'

// create GET service to return the list of countries
export async function GET(
  req: NextRequest,
  { params }: { params: { externalCityId: string } }
) {
  const externalCityId = parseInt(params?.externalCityId)
  try {
    const city = await prisma.cityApi.findFirst({
      where: {
        externalCityId,
      },
    })

    return new Response(JSON.stringify(city), {
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
