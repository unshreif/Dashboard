'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import {
  SunIcon,
  MoonIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import { chartData, notifications, quickActions, recentActivity, stats } from '@/constants/data'
import ActivityFeed from '@/components/ActivityFeed'
import Notifications from '@/components/Notifications'
import QuickActions from '@/components/QuickActions'
import StatCard from '@/components/StatCard'

const LineChart = dynamic(() => import('@/components/LineChart'), {
  ssr: false,
  loading: () => (
    <div className="h-80 bg-white/50 dark:bg-dark-100/50 backdrop-blur-xs rounded-2xl flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
    </div>
  ),
})

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        gsap.from('.stat-card', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        })
      })

      return () => ctx.revert()
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-200 dark:to-dark-300 transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-8 w-8 text-primary-500 animate-float" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 pl-10 rounded-xl bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <Notifications notifications={notifications} />
            
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 hover:shadow-glow transition-all duration-200"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-warning-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-primary-500" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <StatCard key={stat.name} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue Overview</h2>
            <div className="h-80">
              <LineChart />
            </div>
          </div>

          <div className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs rounded-2xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Activity</h2>
            <div className="h-80">
              <LineChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>
          <div>
            <QuickActions actions={quickActions} />
          </div>
        </div>
      </div>
    </main>
  )
}
