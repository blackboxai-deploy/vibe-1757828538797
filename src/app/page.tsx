'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MetricsOverview } from '@/components/dashboard/MetricsOverview'
import { WorkflowStatus } from '@/components/dashboard/WorkflowStatus'
import Link from 'next/link'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeWorkflows, setActiveWorkflows] = useState(0)

  useEffect(() => {
    // Simulate loading of dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false)
      setActiveWorkflows(3)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
          <p className="text-muted-foreground">Initializing your YouTube automation workflows</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            YouTube Automation Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            AI-powered content creation and optimization workflows
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {activeWorkflows} Active Workflows
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/content-planning">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3"></div>
                Content Ideas
              </CardTitle>
              <CardDescription>Generate AI-powered video concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Start Creating
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/script-generator">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                Script Writer
              </CardTitle>
              <CardDescription>Create engaging video scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Write Script
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/thumbnail-studio">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3"></div>
                Thumbnails
              </CardTitle>
              <CardDescription>AI-generated thumbnail designs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Create Thumbnail
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/automation">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mr-3"></div>
                Workflows
              </CardTitle>
              <CardDescription>Automate your content pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Setup Automation
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsOverview />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <WorkflowStatus />
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest content creation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Generated 5 content ideas', time: '2 hours ago', type: 'ideas' },
                  { action: 'Created script for "AI Tutorial"', time: '4 hours ago', type: 'script' },
                  { action: 'Generated thumbnail variants', time: '6 hours ago', type: 'thumbnail' },
                  { action: 'Optimized video tags', time: '1 day ago', type: 'optimization' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'ideas' ? 'bg-blue-500' :
                      activity.type === 'script' ? 'bg-purple-500' :
                      activity.type === 'thumbnail' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">AI Services</p>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-green-600 dark:text-green-400">All services operational</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">API Connections</p>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-green-600 dark:text-green-400">Connected and ready</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Automation Engine</p>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-green-600 dark:text-green-400">Running smoothly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}