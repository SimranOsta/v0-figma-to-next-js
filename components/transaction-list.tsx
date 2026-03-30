"use client"

import { ShoppingBag, Coffee, Zap, Music, Plane } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: 1,
    name: "Apple Store",
    category: "Shopping",
    amount: -999.0,
    icon: ShoppingBag,
    color: "from-pink-500 to-rose-500",
    time: "Today, 2:34 PM",
  },
  {
    id: 2,
    name: "Starbucks",
    category: "Food & Drink",
    amount: -12.5,
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    time: "Today, 10:15 AM",
  },
  {
    id: 3,
    name: "Electric Bill",
    category: "Utilities",
    amount: -85.0,
    icon: Zap,
    color: "from-yellow-500 to-amber-500",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Spotify",
    category: "Subscription",
    amount: -9.99,
    icon: Music,
    color: "from-emerald-500 to-green-500",
    time: "Mar 28",
  },
  {
    id: 5,
    name: "Flight Booking",
    category: "Travel",
    amount: -450.0,
    icon: Plane,
    color: "from-cyan-500 to-blue-500",
    time: "Mar 25",
  },
]

export function TransactionList() {
  return (
    <GlassCard className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-sm text-indigo-400 hover:text-indigo-300">
          See All
        </button>
      </div>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="group flex items-center justify-between rounded-xl p-2 transition-all hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
                  transaction.color
                )}
              >
                <transaction.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">{transaction.name}</p>
                <p className="text-xs text-white/50">{transaction.time}</p>
              </div>
            </div>
            <p
              className={cn(
                "font-semibold",
                transaction.amount < 0 ? "text-white" : "text-emerald-400"
              )}
            >
              {transaction.amount < 0 ? "-" : "+"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
