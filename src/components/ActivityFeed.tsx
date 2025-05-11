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
    <div className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{activities.length} activities</span>
      </div>
      <div ref={containerRef} className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-item flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-200/50 hover:bg-gray-100 dark:hover:bg-dark-200 transition-all duration-300 group"
          >
            <div className={`p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110 ${
              activity.type === 'report' ? 'bg-primary-100 dark:bg-primary-900/20' :
              activity.type === 'settings' ? 'bg-warning-100 dark:bg-warning-900/20' :
              'bg-success-100 dark:bg-success-900/20'
            }`}>
              {activity.type === 'report' ? <DocumentIcon className="h-5 w-5 text-primary-500" /> :
               activity.type === 'settings' ? <Cog6ToothIcon className="h-5 w-5 text-warning-500" /> :
               <ChartBarIcon className="h-5 w-5 text-success-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white truncate">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className={`text-xs font-medium ${
                  activity.type === 'report' ? 'text-primary-500' :
                  activity.type === 'settings' ? 'text-warning-500' :
                  'text-success-500'
                }`}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 