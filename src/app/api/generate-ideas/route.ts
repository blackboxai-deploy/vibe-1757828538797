import { NextRequest, NextResponse } from 'next/server'
import { aiClient } from '@/lib/ai-client'

export async function POST(request: NextRequest) {
  try {
    const { topic, channelType, additionalContext } = await request.json()

    if (!topic || !channelType) {
      return NextResponse.json(
        { error: 'Topic and channel type are required' },
        { status: 400 }
      )
    }

    // Generate content ideas using AI
    const ideas = await aiClient.generateContentIdeas(topic, channelType)

    return NextResponse.json({ 
      ideas,
      success: true,
      metadata: {
        topic,
        channelType,
        generatedAt: new Date().toISOString(),
        count: ideas.length
      }
    })

  } catch (error) {
    console.error('Content ideas generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content ideas',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}