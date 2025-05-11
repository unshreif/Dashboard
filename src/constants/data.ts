import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  DocumentIcon,
  UserPlusIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { Activity, ChartData, Notification, QuickAction, Stat } from '@/types'

export const stats: Stat[] = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: CurrencyDollarIcon,
    color: 'bg-success-50 dark:bg-success-900/20',
    textColor: 'text-success-600 dark:text-success-400',
    trend: 'up',
  },
  {
    name: 'Active Users',
    value: '2,338',
    change: '+15.3%',
    icon: UsersIcon,
    color: 'bg-primary-50 dark:bg-primary-900/20',
    textColor: 'text-primary-600 dark:text-primary-400',
    trend: 'up',
  },
  {
    name: 'Sales Growth',
    value: '+23.5%',
    change: '+4.75%',
    icon: ArrowTrendingUpIcon,
    color: 'bg-warning-50 dark:bg-warning-900/20',
    textColor: 'text-warning-600 dark:text-warning-400',
    trend: 'up',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '+1.1%',
    icon: ChartBarIcon,
    color: 'bg-danger-50 dark:bg-danger-900/20',
    textColor: 'text-danger-600 dark:text-danger-400',
    trend: 'up',
  },
]

export const notifications: Notification[] = [
  { id: 1, message: 'New user registration', time: '5m ago', type: 'success' },
  { id: 2, message: 'System update completed', time: '1h ago', type: 'info' },
  { id: 3, message: 'High server load detected', time: '2h ago', type: 'warning' },
]

export const quickActions: QuickAction[] = [
  { name: 'New Report', icon: DocumentIcon, color: 'bg-primary-500' },
  { name: 'Add User', icon: UserPlusIcon, color: 'bg-success-500' },
  { name: 'Settings', icon: Cog6ToothIcon, color: 'bg-warning-500' },
]

export const recentActivity: Activity[] = [
  { id: 1, user: 'John Doe', action: 'created a new report', time: '2 minutes ago', type: 'report' },
  { id: 2, user: 'Sarah Smith', action: 'updated user settings', time: '15 minutes ago', type: 'settings' },
  { id: 3, user: 'Mike Johnson', action: 'added new data source', time: '1 hour ago', type: 'data' },
]

export const chartData: ChartData[] = [
  { name: 'Jan', value: 400, value2: 300 },
  { name: 'Feb', value: 300, value2: 400 },
  { name: 'Mar', value: 600, value2: 500 },
  { name: 'Apr', value: 800, value2: 600 },
  { name: 'May', value: 700, value2: 700 },
  { name: 'Jun', value: 900, value2: 800 },
  { name: 'Jul', value: 1000, value2: 900 },
] 