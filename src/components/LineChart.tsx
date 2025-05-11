'use client'

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

const data = [
  { name: 'Jan', value: 400, value2: 300 },
  { name: 'Feb', value: 300, value2: 400 },
  { name: 'Mar', value: 600, value2: 500 },
  { name: 'Apr', value: 800, value2: 600 },
  { name: 'May', value: 700, value2: 700 },
  { name: 'Jun', value: 900, value2: 800 },
  { name: 'Jul', value: 1000, value2: 900 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-dark-100/90 backdrop-blur-xs p-4 rounded-xl shadow-glow border border-gray-100 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-success-500'}`} />
              <p className={`text-sm ${index === 0 ? 'text-primary-600 dark:text-primary-400' : 'text-success-600 dark:text-success-400'}`}>
                {entry.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="currentColor" 
          className="text-gray-200 dark:text-gray-700"
        />
        <XAxis 
          dataKey="name" 
          stroke="currentColor"
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis 
          stroke="currentColor"
          className="text-gray-600 dark:text-gray-400"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6366F1"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPrimary)"
        />
        <Area
          type="monotone"
          dataKey="value2"
          stroke="#22C55E"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorSuccess)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
} 