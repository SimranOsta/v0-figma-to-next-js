"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { GlassCard } from "./glass-card"

const weeklyData = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 3800 },
  { name: "Thu", value: 2908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3200 },
  { name: "Sun", value: 2100 },
]

const monthlyData = [
  { name: "Week 1", value: 12400 },
  { name: "Week 2", value: 15800 },
  { name: "Week 3", value: 11200 },
  { name: "Week 4", value: 18600 },
]

const yearlyData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 38000 },
  { name: "Mar", value: 51000 },
  { name: "Apr", value: 47000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 62000 },
  { name: "Jul", value: 58000 },
  { name: "Aug", value: 64000 },
  { name: "Sep", value: 71000 },
  { name: "Oct", value: 68000 },
  { name: "Nov", value: 74000 },
  { name: "Dec", value: 82000 },
]

const periods = ["Week", "Month", "Year"] as const
type Period = (typeof periods)[number]

const dataByPeriod = {
  Week: weeklyData,
  Month: monthlyData,
  Year: yearlyData,
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/20 bg-black/80 px-3 py-2 backdrop-blur-xl">
        <p className="text-sm font-semibold text-white">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function SpendingChart() {
  const [activePeriod, setActivePeriod] = useState<Period>("Week")

  return (
    <GlassCard className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Total Spending</p>
          <p className="text-2xl font-bold text-white">$24,506</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-white/5 p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activePeriod === period
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataByPeriod[activePeriod]}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorValue)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
