"use client"

import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"

const stats = [
  {
    id: 1,
    label: "Income",
    value: "$12,450",
    change: "+23%",
    isPositive: true,
    icon: ArrowUpRight,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  {
    id: 2,
    label: "Expenses",
    value: "$8,320",
    change: "-12%",
    isPositive: true,
    icon: ArrowDownRight,
    color: "text-rose-400",
    bgColor: "bg-rose-500/20",
  },
  {
    id: 3,
    label: "Savings",
    value: "$4,130",
    change: "+8%",
    isPositive: true,
    icon: PiggyBank,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
  {
    id: 4,
    label: "Investments",
    value: "$15,890",
    change: "+15%",
    isPositive: true,
    icon: Wallet,
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <GlassCard key={stat.id} className="p-4">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                stat.bgColor
              )}
            >
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                stat.isPositive ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {stat.change}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-white/50">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
