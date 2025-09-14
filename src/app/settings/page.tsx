'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    youtube: '',
    replicate: ''
  })

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    workflow: true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
            Settings & Configuration
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Configure API keys, preferences, and automation settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            System Connected
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3"></div>
                AI Services Configuration
              </CardTitle>
              <CardDescription>
                Configure API keys for AI content generation and image creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKeys.openai}
                  onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Used for content ideation, script generation, and optimization
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="replicate-key">Replicate API Key</Label>
                <Input
                  id="replicate-key"
                  type="password"
                  placeholder="r8_..."
                  value={apiKeys.replicate}
                  onChange={(e) => setApiKeys({...apiKeys, replicate: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Used for AI thumbnail generation with Flux models
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube-key">YouTube Data API Key</Label>
                <Input
                  id="youtube-key"
                  type="password"
                  placeholder="AIza..."
                  value={apiKeys.youtube}
                  onChange={(e) => setApiKeys({...apiKeys, youtube: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Used for analytics, trend analysis, and performance tracking
                </p>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Save API Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Configuration Status</CardTitle>
              <CardDescription>Overview of your API connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Content Generation AI</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Image Generation (Flux)</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span>YouTube Analytics</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Setup Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                Content Generation Preferences
              </CardTitle>
              <CardDescription>
                Customize default settings for AI-generated content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Content Tone</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="educational-friendly">Educational & Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Conversational</option>
                  <option value="energetic">Energetic & Enthusiastic</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Default Video Duration</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="8-12">8-12 minutes (Standard)</option>
                  <option value="5-8">5-8 minutes (Short Form)</option>
                  <option value="12-20">12-20 minutes (Deep Dive)</option>
                  <option value="20+">20+ minutes (Comprehensive)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Style Preference</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="modern-tech">Modern Tech</option>
                  <option value="professional">Professional Business</option>
                  <option value="vibrant">Vibrant & Colorful</option>
                  <option value="minimalist">Minimalist & Clean</option>
                </select>
              </div>

              <Button variant="outline">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3"></div>
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage how you receive updates about your automation workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive workflow updates and reports via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time updates in your browser
                  </p>
                </div>
                <Switch
                  checked={notifications.browser}
                  onCheckedChange={(checked) => setNotifications({...notifications, browser: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workflow Completion Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when automation workflows finish
                  </p>
                </div>
                <Switch
                  checked={notifications.workflow}
                  onCheckedChange={(checked) => setNotifications({...notifications, workflow: checked})}
                />
              </div>

              <Button variant="outline">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg mr-3"></div>
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your account settings and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Pro Plan</Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Usage This Month</Label>
                  <div className="text-2xl font-bold">1,247 API calls</div>
                  <p className="text-xs text-muted-foreground">of 10,000 limit</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Content ideas generated</span>
                    <span className="text-muted-foreground">127 this month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scripts created</span>
                    <span className="text-muted-foreground">45 this month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thumbnails generated</span>
                    <span className="text-muted-foreground">89 this month</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline">
                  Export Data
                </Button>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}