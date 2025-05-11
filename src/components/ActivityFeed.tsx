'use client'

import { Activity } from '@/types'
import { ChartBarIcon, Cog6ToothIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ActivityFeedProps {
  activities: Activity[]
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.activity-item', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-100 dark:to-dark-200 rounded-3xl shadow-lg p-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent dark:from-primary-400/5" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/10 dark:bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-success-500/10 dark:bg-success-400/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-500/10 dark:bg-primary-500/20">
              <DocumentIcon className="h-5 w-5 text-primary-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide">Recent Activity</h2>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-dark-100/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {activities.length} activities
          </span>
        </div>
        
        <div ref={containerRef} className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-item group relative bg-white/90 dark:bg-dark-100/90 hover:bg-white dark:hover:bg-dark-100 rounded-2xl p-4 transition-all duration-500 overflow-hidden backdrop-blur-sm shadow-sm"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex items-start gap-4">
                <div className={`p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 ${
                  activity.type === 'report' ? 'bg-primary-500/10 dark:bg-primary-500/20' :
                  activity.type === 'settings' ? 'bg-warning-500/10 dark:bg-warning-500/20' :
                  'bg-success-500/10 dark:bg-success-500/20'
                }`}>
                  {activity.type === 'report' ? 
                    <DocumentIcon className="h-5 w-5 text-primary-500 group-hover:rotate-12 transition-transform duration-500" /> :
                   activity.type === 'settings' ? 
                    <Cog6ToothIcon className="h-5 w-5 text-warning-500 group-hover:rotate-12 transition-transform duration-500" /> :
                    <ChartBarIcon className="h-5 w-5 text-success-500 group-hover:rotate-12 transition-transform duration-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm ${
                      activity.type === 'report' ? 'bg-primary-500/10 text-primary-500' :
                      activity.type === 'settings' ? 'bg-warning-500/10 text-warning-500' :
                      'bg-success-500/10 text-success-500'
                    }`}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 