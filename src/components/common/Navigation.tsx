'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    description: 'Overview and quick stats'
  },
  {
    title: 'Content Planning',
    href: '/content-planning',
    description: 'AI-powered idea generation'
  },
  {
    title: 'Script Generator',
    href: '/script-generator',
    description: 'Create engaging video scripts'
  },
  {
    title: 'Thumbnail Studio',
    href: '/thumbnail-studio',
    description: 'AI thumbnail creation'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    description: 'Performance insights'
  },
  {
    title: 'Automation',
    href: '/automation',
    description: 'Workflow management'
  },
  {
    title: 'Settings',
    href: '/settings',
    description: 'API configuration'
  }
]

export function Navigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      'flex flex-col border-r bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-semibold text-sm">YouTube Agent</h1>
              <p className="text-xs text-muted-foreground">AI Automation</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '→' : '←'}
        </Button>
      </div>

      {/* Status Badge */}
      {!isCollapsed && (
        <div className="p-4">
          <Badge variant="outline" className="w-full justify-center bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            System Active
          </Badge>
        </div>
      )}

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-2 py-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start h-auto p-3',
                    isActive && 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
                    !isActive && 'hover:bg-slate-100 dark:hover:bg-slate-800',
                    isCollapsed && 'px-2'
                  )}
                >
                  <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'space-x-3')}>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      isActive ? 'bg-white' : 'bg-slate-400'
                    )} />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className={cn(
                          'text-xs mt-0.5',
                          isActive ? 'text-red-100' : 'text-muted-foreground'
                        )}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </div>
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className="p-4">
        {!isCollapsed && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Powered by AI
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}