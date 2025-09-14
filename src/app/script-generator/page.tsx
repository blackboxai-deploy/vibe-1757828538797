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

export default function ScriptGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [script, setScript] = useState('')
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [tone, setTone] = useState('')
  const [additionalRequirements, setAdditionalRequirements] = useState('')

  const handleGenerateScript = async () => {
    if (!title || !duration || !tone) return

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          duration,
          tone,
          additionalRequirements
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const data = await response.json()
      setScript(data.script || '')
    } catch (error) {
      console.error('Error generating script:', error)
      // Fallback with sample script for demonstration
      setScript(`# ${title}

## HOOK (0:00 - 0:15)
What if I told you that ${title.toLowerCase()} could completely transform your workflow in the next 10 minutes? Stay tuned because today we're diving deep into something that's going to blow your mind.

**[ON SCREEN: Eye-catching title animation]**

## INTRODUCTION (0:15 - 0:45)
Hey everyone, welcome back to the channel! If you're new here, I'm [Your Name] and this channel is all about [your niche]. Today's video is going to be special because we're covering ${title.toLowerCase()}.

Before we jump in, if you find this valuable, smash that like button and subscribe for more content like this. It really helps the channel grow!

## MAIN CONTENT (0:45 - ${duration === '5-8 minutes' ? '6:00' : duration === '8-12 minutes' ? '9:00' : '12:00'})

### Section 1: The Foundation
Let's start with the basics. ${title} is important because...

**[ON SCREEN: Key points as bullet points]**

### Section 2: Deep Dive
Now, here's where it gets interesting...

**[ENGAGEMENT HOOK: "Comment below if you've ever experienced this!"]**

### Section 3: Practical Application
Let me show you exactly how to implement this...

**[ON SCREEN: Step-by-step visual guide]**

## CONCLUSION (${duration === '5-8 minutes' ? '6:00' : duration === '8-12 minutes' ? '9:00' : '12:00'} - END)
So there you have it! We've covered [recap main points]. The key takeaway here is...

**[CALL TO ACTION]**
If you enjoyed this video, you're going to love my next one about [related topic]. Make sure to subscribe and hit that notification bell so you don't miss it.

Also, check out this related video [point to end screen] - it's going to help you take this to the next level.

Thanks for watching, and I'll see you in the next one!

**[END SCREEN: Subscribe button and related video thumbnails]**

---

**NOTES FOR CREATOR:**
- Total estimated runtime: ${duration}
- Tone: ${tone}
- Include B-roll footage during main sections
- Add subtitle overlays for key points
- Use engaging transitions between sections
- Consider adding background music (low volume)`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
            Script Generator Studio
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Create engaging, retention-optimized video scripts with AI
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
            Script AI Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Script Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Script Generator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                  Generate Video Script
                </CardTitle>
                <CardDescription>
                  Create professional, engaging scripts optimized for viewer retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    placeholder="e.g., How to Build an AI App in 10 Minutes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Target Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select video length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-8 minutes">5-8 minutes (Short Form)</SelectItem>
                      <SelectItem value="8-12 minutes">8-12 minutes (Standard)</SelectItem>
                      <SelectItem value="12-20 minutes">12-20 minutes (Deep Dive)</SelectItem>
                      <SelectItem value="20+ minutes">20+ minutes (Comprehensive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Content Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone and style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="educational-friendly">Educational & Friendly</SelectItem>
                      <SelectItem value="professional-authoritative">Professional & Authoritative</SelectItem>
                      <SelectItem value="casual-conversational">Casual & Conversational</SelectItem>
                      <SelectItem value="energetic-enthusiastic">Energetic & Enthusiastic</SelectItem>
                      <SelectItem value="storytelling-narrative">Storytelling & Narrative</SelectItem>
                      <SelectItem value="technical-detailed">Technical & Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Additional Requirements (Optional)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Specific points to cover, target audience details, call-to-actions..."
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleGenerateScript}
                  disabled={!title || !duration || !tone || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Script...
                    </>
                  ) : (
                    'Generate Video Script'
                  )}
                </Button>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Script Features</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Hook-optimized opening (15-second rule)</li>
                    <li>• Retention triggers throughout content</li>
                    <li>• Strategic call-to-actions placement</li>
                    <li>• Engagement prompts and questions</li>
                    <li>• SEO-optimized structure</li>
                    <li>• End screen optimization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Generated Script Display */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg mr-3"></div>
                    Generated Script
                  </div>
                  {script && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Copy
                      </Button>
                      <Button size="sm" variant="outline">
                        Export
                      </Button>
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  {script ? 'Your AI-generated video script' : 'Your professional video script will appear here'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {script ? (
                  <div className="space-y-4">
                    <div className="max-h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {script}
                      </pre>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                      <div className="flex items-center space-x-4">
                        <span>📝 {script.split(' ').length} words</span>
                        <span>⏱️ ~{Math.ceil(script.split(' ').length / 150)} min read</span>
                        <span>🎯 {duration}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        Create Thumbnail
                      </Button>
                      <Button variant="outline">
                        Optimize SEO
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                    </div>
                    <p>Fill in the details above to generate your video script</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Tutorial Template', description: 'Step-by-step instructional content', color: 'blue' },
              { name: 'Review Template', description: 'Product or service reviews', color: 'green' },
              { name: 'Storytelling Template', description: 'Narrative-driven content', color: 'purple' },
              { name: 'Educational Template', description: 'Knowledge-sharing format', color: 'orange' },
              { name: 'Comparison Template', description: 'Side-by-side comparisons', color: 'red' },
              { name: 'Behind-the-Scenes', description: 'Process and journey content', color: 'indigo' }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`w-8 h-8 bg-gradient-to-r from-${template.color}-500 to-${template.color}-600 rounded-lg mr-3`}></div>
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg mr-3"></div>
                Script Optimization
              </CardTitle>
              <CardDescription>
                Analyze and improve your scripts for maximum engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
                </div>
                <p>Script optimization feature coming soon</p>
                <p className="text-sm mt-2">AI-powered analysis for retention, engagement, and SEO optimization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}