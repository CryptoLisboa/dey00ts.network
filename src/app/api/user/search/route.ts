import { NextRequest, NextResponse } from 'next/server'
import { SEARCH_PAGE_SIZE } from '@/constants/app.constants'
import { searchUsers } from '@/services/user'

interface SearchUsersForm {
  page: number
  skills: number[]
}

// create GET service to return the user
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const reqUrl = new URL(req.url)
    const { searchParams } = reqUrl
    const page = parseInt(searchParams.get('page') || '1', 10)
    const skills =
      searchParams
        .get('skills')
        ?.split(',')
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(Number(id))) || []

    const pageIsANumber = !isNaN(page)
    const isInvalidPage = pageIsANumber && page < 1

    if (isInvalidPage) {
      return new Response(
        JSON.stringify({
          error:
            'Invalid page number or page number is required to be greater than 0',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const users = await searchUsers(skills, page, SEARCH_PAGE_SIZE)

    return new Response(JSON.stringify(users), {
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
