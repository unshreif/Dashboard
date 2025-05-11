'use client'

import { QuickAction } from '@/types'
import { PlusIcon, BoltIcon } from '@heroicons/react/24/outline'
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
    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-100 dark:to-dark-200 rounded-3xl shadow-lg p-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent dark:from-primary-400/5" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/10 dark:bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-success-500/10 dark:bg-success-400/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-500/10 dark:bg-primary-500/20">
              <BoltIcon className="h-5 w-5 text-primary-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide">Quick Actions</h2>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-dark-100/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {actions.length} actions
          </span>
        </div>
        
        <div ref={containerRef} className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              className="action-button group relative bg-white/90 dark:bg-dark-100/90 hover:bg-white dark:hover:bg-dark-100 rounded-2xl p-4 transition-all duration-500 overflow-hidden backdrop-blur-sm shadow-sm"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex flex-col items-center gap-3">
                <div className="p-3 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 transition-all duration-500 group-hover:scale-110">
                  <action.icon className="h-6 w-6 text-primary-500 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {action.name}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <button className="mt-6 w-full bg-white/90 dark:bg-dark-100/90 hover:bg-white dark:hover:bg-dark-100 text-primary-500 rounded-2xl py-3 px-4 transition-all duration-500 flex items-center justify-center gap-2 group backdrop-blur-sm shadow-sm">
          <PlusIcon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-medium">Add New Action</span>
        </button>
      </div>
    </div>
  )
} 