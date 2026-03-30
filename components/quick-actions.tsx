"use client"

import { Send, Download, ArrowLeftRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  {
    id: "send",
    icon: Send,
    label: "Send",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    id: "receive",
    icon: Download,
    label: "Receive",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "swap",
    icon: ArrowLeftRight,
    label: "Swap",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "topup",
    icon: Plus,
    label: "Top Up",
    gradient: "from-amber-500 to-orange-500",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          className="group flex flex-col items-center gap-2"
        >
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl",
              "bg-gradient-to-br transition-all duration-300",
              "group-hover:scale-110 group-hover:shadow-lg",
              action.gradient
            )}
          >
            <action.icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium text-white/70 group-hover:text-white">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  )
}
