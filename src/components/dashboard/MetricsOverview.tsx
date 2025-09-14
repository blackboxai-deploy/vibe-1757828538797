'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface MetricData {
  label: string
  value: number
  change: number
  color: string
  format: 'number' | 'percentage' | 'duration'
}

export function MetricsOverview() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch metrics
    const timer = setTimeout(() => {
      setMetrics([
        {
          label: 'Content Ideas Generated',
          value: 127,
          change: 23,
          color: 'blue',
          format: 'number'
        },
        {
          label: 'Scripts Created',
          value: 45,
          change: 12,
          color: 'purple',
          format: 'number'
        },
        {
          label: 'Thumbnails Generated',
          value: 89,
          change: 34,
          color: 'green',
          format: 'number'
        },
        {
          label: 'SEO Optimization Rate',
          value: 92,
          change: 5,
          color: 'orange',
          format: 'percentage'
        },
        {
          label: 'Avg. Processing Time',
          value: 2.3,
          change: -15,
          color: 'red',
          format: 'duration'
        },
        {
          label: 'Workflow Efficiency',
          value: 87,
          change: 8,
          color: 'indigo',
          format: 'percentage'
        }
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const formatValue = (value: number, format: 'number' | 'percentage' | 'duration'): string => {
    switch (format) {
      case 'percentage':
        return `${value}%`
      case 'duration':
        return `${value}min`
      default:
        return value.toLocaleString()
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      indigo: 'from-indigo-500 to-indigo-600'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <div className={`w-8 h-8 bg-gradient-to-r ${getColorClasses(metric.color)} rounded-lg`}></div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold">
                  {formatValue(metric.value, metric.format)}
                </div>
                <div className={`text-sm font-medium ${
                  metric.change > 0 ? 'text-green-600' : 'text-red-600'
                } flex items-center`}>
                  <span className="mr-1">
                    {metric.change > 0 ? '↗' : '↘'}
                  </span>
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <Progress 
                value={metric.format === 'percentage' ? metric.value : Math.min((metric.value / 100) * 100, 100)} 
                className="mt-3 h-2" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {metric.change > 0 ? 'Increased' : 'Decreased'} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg mr-3"></div>
            Performance Summary
          </CardTitle>
          <CardDescription>
            Your YouTube automation performance over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-muted-foreground">Total Ideas</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">45</div>
              <div className="text-sm text-muted-foreground">Scripts Written</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-muted-foreground">Thumbnails Created</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">261</div>
              <div className="text-sm text-muted-foreground">Total Assets</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">AI Performance Insights</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Content ideas with 85%+ engagement prediction: 78 generated</li>
              <li>• Scripts optimized for viewer retention: Average 92% completion rate</li>
              <li>• Thumbnails A/B tested: 23% average CTR improvement</li>
              <li>• SEO-optimized content: 92% search visibility increase</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}