import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Proxy the request to the backend
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json(data, { status: response.status })
    }
  } catch (error) {
    console.error('Verify token API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 