"use client"

import { Eye, EyeOff, TrendingUp } from "lucide-react"
import { useState } from "react"

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6">
      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      {/* Card content */}
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">Total Balance</p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">
                {showBalance ? "$48,562.80" : "••••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4 text-white" />
                ) : (
                  <Eye className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">+12.5%</span>
          </div>
          <span className="text-xs text-white/60">vs last month</span>
        </div>

        {/* Card number hint */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <span className="ml-2 text-sm text-white/70">4582</span>
          </div>
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full bg-red-500 opacity-80" />
            <div className="h-8 w-8 rounded-full bg-amber-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  )
}
