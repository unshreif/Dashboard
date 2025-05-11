'use client'

import { Notification } from '@/types'
import { BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface NotificationsProps {
  notifications: Notification[]
}

export default function Notifications({ notifications }: NotificationsProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showNotifications && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const dropdownHeight = dropdownRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - buttonRect.bottom
      const spaceAbove = buttonRect.top

      // If there's not enough space below but more space above, show dropdown above
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }

      const ctx = gsap.context(() => {
        gsap.from('.notification-item', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        })
      }, dropdownRef)

      return () => ctx.revert()
    }
  }, [showNotifications])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-xl bg-white/80 dark:bg-dark-100/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 hover:shadow-glow transition-all duration-300 relative group"
      >
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-danger-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <div 
          ref={dropdownRef}
          className={`absolute ${
            dropdownPosition === 'top' 
              ? 'bottom-full mb-2' 
              : 'top-full mt-2'
          } right-0 w-80 bg-white/90 dark:bg-dark-100/90 backdrop-blur-xs rounded-xl shadow-glow border border-gray-200 dark:border-gray-700 overflow-hidden z-50`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{notifications.length} new</span>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-success-500' :
                    notification.type === 'warning' ? 'bg-warning-500' :
                    'bg-primary-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className={`text-xs font-medium ${
                        notification.type === 'success' ? 'text-success-500' :
                        notification.type === 'warning' ? 'text-warning-500' :
                        'text-primary-500'
                      }`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 