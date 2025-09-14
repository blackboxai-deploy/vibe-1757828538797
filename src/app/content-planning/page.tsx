'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ContentPlanning() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [ideas, setIdeas] = useState<string[]>([])
  const [topic, setTopic] = useState('')
  const [channelType, setChannelType] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')

  const handleGenerateIdeas = async () => {
    if (!topic || !channelType) return

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          channelType,
          additionalContext
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate ideas')
      }

      const data = await response.json()
      setIdeas(data.ideas || [])
    } catch (error) {
      console.error('Error generating ideas:', error)
      // Fallback with sample ideas for demonstration
      setIdeas([
        "10 Beginner-Friendly AI Tools You Need to Try Today | AI tools, beginner guide, productivity | 8-10 min | Easy",
        "ChatGPT vs Claude vs Gemini: Ultimate AI Comparison 2024 | AI comparison, ChatGPT, Claude | 12-15 min | Medium",
        "I Built an App Using Only AI in 24 Hours (Shocking Results) | AI development, coding, no-code | 15-18 min | Hard",
        "The Future of AI: What Experts Predict for 2025 | AI trends, future tech, predictions | 10-12 min | Easy",
        "AI Art Revolution: Creating Stunning Visuals in Minutes | AI art, Midjourney, DALL-E | 8-10 min | Easy"
      ])
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Content Planning Studio
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            AI-powered content ideation and strategic planning
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Ideas Generator Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Idea Generator</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* Content Generator Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3"></div>
                  Generate Content Ideas
                </CardTitle>
                <CardDescription>
                  Use AI to generate trending, engaging video concepts for your channel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Main Topic or Theme</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Artificial Intelligence, Web Development, Digital Marketing"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-type">Channel Type</Label>
                  <Select value={channelType} onValueChange={setChannelType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your channel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="tech-review">Tech Review</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health-fitness">Health & Fitness</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="food">Food & Cooking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Additional Context (Optional)</Label>
                  <Textarea
                    id="context"
                    placeholder="Target audience, content style, specific requirements..."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleGenerateIdeas}
                  disabled={!topic || !channelType || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Ideas...
                    </>
                  ) : (
                    'Generate Content Ideas'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Ideas Display */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                  Generated Ideas
                </CardTitle>
                <CardDescription>
                  {ideas.length > 0 ? `${ideas.length} content ideas generated` : 'Your AI-generated content ideas will appear here'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ideas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                    <p>Enter a topic and channel type to generate content ideas</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ideas.map((idea, index) => {
                      const parts = idea.split(' | ')
                      const title = parts[0] || idea
                      const keywords = parts[1] || ''
                      const duration = parts[2] || ''
                      const difficulty = parts[3] || ''

                      return (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-lg leading-tight">{title}</h4>
                              
                              {keywords && (
                                <div className="flex flex-wrap gap-2">
                                  {keywords.split(', ').map((keyword, kidx) => (
                                    <Badge key={kidx} variant="secondary" className="text-xs">
                                      {keyword.trim()}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center space-x-4">
                                  {duration && <span>📺 {duration}</span>}
                                  {difficulty && (
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      difficulty.toLowerCase().includes('easy') ? 'bg-green-100 text-green-700' :
                                      difficulty.toLowerCase().includes('medium') ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {difficulty}
                                    </span>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    Save
                                  </Button>
                                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-purple-600">
                                    Create Script
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3"></div>
                Content Calendar
              </CardTitle>
              <CardDescription>
                Schedule and organize your content pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                </div>
                <p>Content calendar feature coming soon</p>
                <p className="text-sm mt-2">Plan and schedule your content with AI-powered recommendations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mr-3"></div>
                Trend Analysis
              </CardTitle>
              <CardDescription>
                Discover trending topics and optimize content timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </div>
                <p>Trend analysis feature coming soon</p>
                <p className="text-sm mt-2">AI-powered trend detection and content optimization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}