import { NextRequest, NextResponse } from 'next/server'
import { aiClient } from '@/lib/ai-client'

export async function POST(request: NextRequest) {
  try {
    const { title, duration, tone, additionalRequirements } = await request.json()

    if (!title || !duration || !tone) {
      return NextResponse.json(
        { error: 'Title, duration, and tone are required' },
        { status: 400 }
      )
    }

    // Generate script using AI
    const script = await aiClient.generateVideoScript(
      title, 
      duration, 
      tone + (additionalRequirements ? ` Additional requirements: ${additionalRequirements}` : '')
    )

    return NextResponse.json({ 
      script,
      success: true,
      metadata: {
        title,
        duration,
        tone,
        generatedAt: new Date().toISOString(),
        wordCount: script.split(' ').length,
        estimatedReadTime: Math.ceil(script.split(' ').length / 150)
      }
    })

  } catch (error) {
    console.error('Script generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate script',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}