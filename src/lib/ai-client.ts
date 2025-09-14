// AI Client Configuration for YouTube Automation Agent
export interface AIClientConfig {
  endpoint: string
  customerId: string
  apiKey: string
  model: string
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
}

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class AIClient {
  private config: AIClientConfig

  constructor(config?: Partial<AIClientConfig>) {
    this.config = {
      endpoint: process.env.AI_ENDPOINT || 'https://oi-server.onrender.com/chat/completions',
      customerId: process.env.AI_CUSTOMER_ID || 'cus_S3RQ5bJuIraR0Z',
      apiKey: process.env.AI_API_KEY || 'xxx',
      model: 'openrouter/anthropic/claude-3.5-sonnet',
      ...config
    }
  }

  async generateCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CustomerId': this.config.customerId,
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...request,
          model: request.model || this.config.model,
        }),
      })

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AI Client Error:', error)
      throw new Error(`Failed to generate AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async generateContentIdeas(topic: string, channelType: string): Promise<string[]> {
    const request: ChatCompletionRequest = {
      model: this.config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a YouTube content strategist expert. Generate engaging, trending content ideas that are specific, actionable, and optimized for high engagement.'
        },
        {
          role: 'user',
          content: `Generate 10 compelling YouTube video ideas for a ${channelType} channel focusing on ${topic}. Each idea should be:
          1. Specific and actionable
          2. Trending and engaging
          3. SEO-optimized with strong keywords
          4. Include estimated video length and difficulty level
          
          Format each idea as: "Title | Description | Keywords | Duration | Difficulty"`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    }

    const response = await this.generateCompletion(request)
    const content = response.choices[0]?.message?.content || ''
    
    return content.split('\n').filter(line => line.trim() && line.includes('|'))
  }

  async generateVideoScript(title: string, duration: string, tone: string): Promise<string> {
    const request: ChatCompletionRequest = {
      model: this.config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional YouTube script writer. Create engaging, well-structured video scripts that maximize viewer retention and engagement.'
        },
        {
          role: 'user',
          content: `Write a complete YouTube video script for:
          Title: "${title}"
          Duration: ${duration}
          Tone: ${tone}
          
          Include:
          - Hook (first 15 seconds)
          - Clear structure with timestamps
          - Engagement triggers (subscribe reminders, questions)
          - Strong call-to-action
          - Natural transitions
          - Retention hooks throughout
          
          Format with clear sections and timing markers.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }

    const response = await this.generateCompletion(request)
    return response.choices[0]?.message?.content || ''
  }

  async optimizeContent(title: string, description: string, tags: string[]): Promise<{
    optimizedTitle: string
    optimizedDescription: string
    optimizedTags: string[]
    seoScore: number
  }> {
    const request: ChatCompletionRequest = {
      model: this.config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a YouTube SEO expert. Optimize content for maximum discoverability, click-through rates, and algorithmic performance.'
        },
        {
          role: 'user',
          content: `Optimize this YouTube content for SEO and engagement:

          Current Title: "${title}"
          Current Description: "${description}"
          Current Tags: ${tags.join(', ')}
          
          Provide:
          1. Optimized title (under 60 chars, clickable, SEO-friendly)
          2. Optimized description (with timestamps, keywords, calls-to-action)
          3. Optimized tags (mix of broad and specific, trending keywords)
          4. SEO score (1-100) with explanation
          
          Format as JSON with keys: optimizedTitle, optimizedDescription, optimizedTags, seoScore, explanation`
        }
      ],
      temperature: 0.5,
      max_tokens: 1500
    }

    const response = await this.generateCompletion(request)
    const content = response.choices[0]?.message?.content || ''
    
    try {
      const parsed = JSON.parse(content)
      return {
        optimizedTitle: parsed.optimizedTitle || title,
        optimizedDescription: parsed.optimizedDescription || description,
        optimizedTags: parsed.optimizedTags || tags,
        seoScore: parsed.seoScore || 50
      }
    } catch {
      return {
        optimizedTitle: title,
        optimizedDescription: description,
        optimizedTags: tags,
        seoScore: 50
      }
    }
  }
}

export const aiClient = new AIClient()