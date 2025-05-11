'use client'

import { Stat } from '@/types'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface StatCardProps {
  stat: Stat
}

export default function StatCard({ stat }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (cardRef.current && valueRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })

        gsap.from(valueRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'back.out(1.7)',
        })
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-100 dark:to-dark-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent dark:from-primary-400/5" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/10 dark:bg-primary-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-success-500/10 dark:bg-success-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${
            stat.color.includes('primary') ? 'bg-primary-500/10 dark:bg-primary-500/20' :
            stat.color.includes('success') ? 'bg-success-500/10 dark:bg-success-500/20' :
            stat.color.includes('warning') ? 'bg-warning-500/10 dark:bg-warning-500/20' :
            'bg-gray-500/10 dark:bg-gray-500/20'
          } group-hover:scale-110 transition-all duration-500`}>
            <stat.icon className={`h-6 w-6 ${
              stat.color.includes('primary') ? 'text-primary-500' :
              stat.color.includes('success') ? 'text-success-500' :
              stat.color.includes('warning') ? 'text-warning-500' :
              'text-gray-500'
            } group-hover:rotate-12 transition-transform duration-500`} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-200/50">
            {stat.trend === 'up' ? (
              <ArrowTrendingUpIcon className={`h-4 w-4 ${stat.textColor}`} />
            ) : (
              <ArrowTrendingDownIcon className={`h-4 w-4 ${stat.textColor}`} />
            )}
            <span className={`text-sm font-medium ${stat.textColor}`}>{stat.change}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">{stat.name}</p>
          <p 
            ref={valueRef}
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent"
          >
            {stat.value}
          </p>
        </div>
      </div>
    </div>
  )
} 