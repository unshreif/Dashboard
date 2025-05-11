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
      className="group relative bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs rounded-2xl shadow-card hover:shadow-glow p-6 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-dark-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
          <p 
            ref={valueRef}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            {stat.value}
          </p>
          <div className="flex items-center gap-1.5">
            <p className={`text-sm font-medium ${stat.textColor}`}>{stat.change}</p>
            {stat.trend === 'up' ? (
              <ArrowTrendingUpIcon className={`h-4 w-4 ${stat.textColor}`} />
            ) : (
              <ArrowTrendingDownIcon className={`h-4 w-4 ${stat.textColor}`} />
            )}
          </div>
        </div>
        <div 
          className={`p-4 ${stat.color} rounded-xl group-hover:scale-110 transition-all duration-300 group-hover:rotate-3`}
        >
          <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
        </div>
      </div>
    </div>
  )
} 