'use client'

import { QuickAction } from '@/types'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface QuickActionsProps {
  actions: QuickAction[]
}

export default function QuickActions({ actions }: QuickActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.action-button', {
          x: -30,
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{actions.length} actions</span>
      </div>
      <div ref={containerRef} className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="action-button w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-200/50 hover:bg-gray-100 dark:hover:bg-dark-200 transition-all duration-300 group"
          >
            <div 
              className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-all duration-300 group-hover:rotate-3`}
            >
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
              {action.name}
            </span>
          </button>
        ))}
        <button className="action-button w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-dark-200/50">
          <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300" />
          <span className="text-sm font-medium text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
            Add New Action
          </span>
        </button>
      </div>
    </div>
  )
} 