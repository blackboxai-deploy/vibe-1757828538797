'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface WorkflowItem {
  id: string
  name: string
  status: 'running' | 'completed' | 'paused' | 'error'
  progress: number
  eta: string
  lastRun: string
  totalRuns: number
  successRate: number
}

export function WorkflowStatus() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch workflow status
    const timer = setTimeout(() => {
      setWorkflows([
        {
          id: '1',
          name: 'Daily Content Ideas Generation',
          status: 'running',
          progress: 67,
          eta: '5 minutes',
          lastRun: '2 hours ago',
          totalRuns: 89,
          successRate: 98
        },
        {
          id: '2',
          name: 'Weekly Script Batch Creation',
          status: 'completed',
          progress: 100,
          eta: 'Completed',
          lastRun: '1 day ago',
          totalRuns: 12,
          successRate: 92
        },
        {
          id: '3',
          name: 'Thumbnail A/B Test Generator',
          status: 'paused',
          progress: 0,
          eta: 'Paused',
          lastRun: '3 days ago',
          totalRuns: 45,
          successRate: 87
        },
        {
          id: '4',
          name: 'SEO Optimization Pipeline',
          status: 'running',
          progress: 34,
          eta: '12 minutes',
          lastRun: '30 minutes ago',
          totalRuns: 156,
          successRate: 94
        },
        {
          id: '5',
          name: 'Performance Analytics Sync',
          status: 'error',
          progress: 0,
          eta: 'Failed',
          lastRun: '1 hour ago',
          totalRuns: 234,
          successRate: 89
        }
      ])
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: WorkflowItem['status']) => {
    const statusConfig = {
      running: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '⚡' },
      completed: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✓' },
      paused: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⏸' },
      error: { color: 'bg-red-100 text-red-800 border-red-200', icon: '⚠' }
    }

    const config = statusConfig[status]
    return (
      <Badge variant="outline" className={config.color}>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-slate-200 rounded w-full mb-4"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Active Workflows */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-1">
                    <span>Last run: {workflow.lastRun}</span>
                    <span>•</span>
                    <span>Total runs: {workflow.totalRuns}</span>
                    <span>•</span>
                    <span>Success rate: {workflow.successRate}%</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(workflow.status)}
                  <Button variant="outline" size="sm">
                    {workflow.status === 'paused' ? 'Resume' : 
                     workflow.status === 'error' ? 'Retry' : 'View'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{workflow.eta}</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                </div>

                {/* Workflow Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">
                      {workflow.progress}%
                    </div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">
                      {workflow.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">
                      {workflow.totalRuns}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Runs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Controls */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3"></div>
            Workflow Management
          </CardTitle>
          <CardDescription>
            Control and monitor your automation workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              Create New Workflow
            </Button>
            <Button variant="outline">
              Import Template
            </Button>
            <Button variant="outline">
              Schedule Batch
            </Button>
            <Button variant="outline">
              View All Logs
            </Button>
          </div>

          <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Quick Stats</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-indigo-600">5</div>
                <div className="text-sm text-muted-foreground">Active Workflows</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">536</div>
                <div className="text-sm text-muted-foreground">Total Executions</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-muted-foreground">Avg Success Rate</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">2.4min</div>
                <div className="text-sm text-muted-foreground">Avg Runtime</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}