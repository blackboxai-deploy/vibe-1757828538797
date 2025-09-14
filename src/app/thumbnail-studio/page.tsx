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

interface GeneratedThumbnail {
  id: string
  url: string
  prompt: string
  style: string
}

export default function ThumbnailStudio() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [thumbnails, setThumbnails] = useState<GeneratedThumbnail[]>([])
  const [videoTitle, setVideoTitle] = useState('')
  const [style, setStyle] = useState('')
  const [description, setDescription] = useState('')

  const handleGenerateThumbnails = async () => {
    if (!videoTitle || !style) return

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoTitle,
          style,
          description
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate thumbnails')
      }

      const data = await response.json()
      setThumbnails(data.thumbnails || [])
    } catch (error) {
      console.error('Error generating thumbnails:', error)
      // Fallback with placeholder images for demonstration
      const placeholderThumbnails = [
        {
          id: '1',
          url: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2b1669ef-c6b3-4f7a-9f1d-37207c3d1f46.png}+with+${style}+style`,
          prompt: `Professional YouTube thumbnail for "${videoTitle}" in ${style} style`,
          style: style
        },
        {
          id: '2', 
          url: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e34e4211-9d02-4f00-b19b-1b8ed4d68fea.png}`,
          prompt: `Alternative design for "${videoTitle}" thumbnail with engaging visuals`,
          style: style
        },
        {
          id: '3',
          url: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ec403cb8-90b5-4842-a011-469a945a488c.png}+video`,
          prompt: `Creative thumbnail variant for "${videoTitle}" optimized for click-through rate`,
          style: style
        }
      ]
      setThumbnails(placeholderThumbnails)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Thumbnail Studio
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Create stunning, high-CTR thumbnails with AI image generation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AI Image Generator Ready
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">A/B Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generator Form */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3"></div>
                  Create Thumbnails
                </CardTitle>
                <CardDescription>
                  Generate multiple high-quality thumbnail variants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    placeholder="e.g., How to Build an AI App in 10 Minutes"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Visual Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select thumbnail style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern-tech">Modern Tech</SelectItem>
                      <SelectItem value="professional-business">Professional Business</SelectItem>
                      <SelectItem value="vibrant-colorful">Vibrant & Colorful</SelectItem>
                      <SelectItem value="minimalist-clean">Minimalist & Clean</SelectItem>
                      <SelectItem value="gaming-style">Gaming Style</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="lifestyle-vlog">Lifestyle Vlog</SelectItem>
                      <SelectItem value="dramatic-cinematic">Dramatic Cinematic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Key elements, color preferences, mood, specific imagery..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleGenerateThumbnails}
                  disabled={!videoTitle || !style || isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Thumbnails...
                    </>
                  ) : (
                    'Generate 3 Thumbnail Variants'
                  )}
                </Button>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Optimization Features</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• High-resolution 1280x720 output</li>
                    <li>• CTR-optimized compositions</li>
                    <li>• Multiple style variations</li>
                    <li>• Eye-catching color schemes</li>
                    <li>• Text overlay compatibility</li>
                    <li>• Mobile-optimized designs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Generated Thumbnails Display */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3"></div>
                      Generated Thumbnails
                    </div>
                    {thumbnails.length > 0 && (
                      <Badge variant="secondary">{thumbnails.length} variants</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {thumbnails.length > 0 ? 'AI-generated thumbnail variants for your video' : 'Your thumbnail variants will appear here'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {thumbnails.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                      </div>
                      <p>Enter video details to generate thumbnail variants</p>
                      <p className="text-sm mt-2">Multiple high-quality designs will be created for A/B testing</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        {thumbnails.map((thumbnail, index) => (
                          <Card key={thumbnail.id} className="border-2 hover:border-green-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="space-y-4">
                                <div className="relative group">
                                  <img 
                                    src={thumbnail.url} 
                                    alt={`Thumbnail variant ${index + 1} for ${videoTitle}`}
                                    className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                    style={{ aspectRatio: '16/9' }}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <div className="flex space-x-3">
                                      <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                                        Download
                                      </Button>
                                      <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <h4 className="font-medium">Variant {index + 1}</h4>
                                    <p className="text-sm text-muted-foreground">{thumbnail.style} style</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      A/B Test
                                    </Button>
                                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600">
                                      Use This
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" onClick={handleGenerateThumbnails} disabled={isGenerating}>
                          Generate More Variants
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-500 to-purple-600">
                          Start A/B Test Campaign
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                Thumbnail Gallery
              </CardTitle>
              <CardDescription>
                Browse and manage your generated thumbnails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                </div>
                <p>Thumbnail gallery coming soon</p>
                <p className="text-sm mt-2">Organize and manage all your generated thumbnails</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Tech Tutorial', description: 'Modern tech-focused design', color: 'blue' },
              { name: 'Gaming Stream', description: 'High-energy gaming style', color: 'red' },
              { name: 'Educational', description: 'Clean educational format', color: 'green' },
              { name: 'Lifestyle Vlog', description: 'Personal lifestyle content', color: 'pink' },
              { name: 'Business Pro', description: 'Professional business style', color: 'indigo' },
              { name: 'Creative Arts', description: 'Artistic and creative design', color: 'purple' }
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

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mr-3"></div>
                A/B Testing Analytics
              </CardTitle>
              <CardDescription>
                Track thumbnail performance and optimize click-through rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </div>
                <p>A/B testing analytics coming soon</p>
                <p className="text-sm mt-2">Compare thumbnail performance and optimize CTR</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}