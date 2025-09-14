'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Automation() {
  const workflows = [
    {
      name: 'Daily Content Ideas',
      description: 'Generate fresh content ideas every morning',
      status: 'active',
      frequency: 'Daily at 9:00 AM',
      color: 'blue'
    },
    {
      name: 'Weekly Script Generation',
      description: 'Create scripts for upcoming videos',
      status: 'active',
      frequency: 'Sundays at 6:00 PM',
      color: 'purple'
    },
    {
      name: 'Thumbnail A/B Testing',
      description: 'Auto-generate and test thumbnail variants',
      status: 'paused',
      frequency: 'On new video upload',
      color: 'green'
    },
    {
      name: 'SEO Optimization',
      description: 'Optimize titles, descriptions, and tags',
      status: 'active',
      frequency: 'After content creation',
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Automation Center
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Configure and manage your YouTube content automation workflows
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
            3 Active Workflows
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="settings">Automation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((workflow, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <div className={`w-8 h-8 bg-gradient-to-r from-${workflow.color}-500 to-${workflow.color}-600 rounded-lg mr-3`}></div>
                      {workflow.name}
                    </CardTitle>
                    <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Frequency:</span> {workflow.frequency}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                      <Button size="sm" variant={workflow.status === 'active' ? 'destructive' : 'default'}>
                        {workflow.status === 'active' ? 'Pause' : 'Resume'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common automation tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Create New Workflow
                </Button>
                <Button variant="outline">
                  Import Template
                </Button>
                <Button variant="outline">
                  Schedule Batch Job
                </Button>
                <Button variant="outline">
                  View All Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3"></div>
                Workflow Builder
              </CardTitle>
              <CardDescription>
                Create custom automation workflows with drag-and-drop interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                </div>
                <p>Visual workflow builder coming soon</p>
                <p className="text-sm mt-2">Drag-and-drop interface for creating custom automation pipelines</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg mr-3"></div>
                Automation Settings
              </CardTitle>
              <CardDescription>
                Configure global automation preferences and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
                </div>
                <p>Automation settings coming soon</p>
                <p className="text-sm mt-2">Global preferences, rate limits, and notification settings</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}