import { prisma } from '@/utils/db.utils'
import { NextRequest } from 'next/server'

// create GET service to return the list of countries
export async function GET(
  req: NextRequest,
  { params }: { params: { externalStateId: string } }
) {
  const externalStateId = parseInt(params?.externalStateId)
  try {
    const state = await prisma.stateApi.findFirst({
      where: {
        externalStateId,
      },
      include: {
        cities: {
          select: {
            id: true,
            externalCityId: true,
            name: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(state), {
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
