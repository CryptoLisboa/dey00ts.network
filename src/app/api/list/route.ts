import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
