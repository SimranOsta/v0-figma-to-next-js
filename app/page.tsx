"use client"

import { useState } from "react"
import { Bell, Search, Settings } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { BalanceCard } from "@/components/balance-card"
import { QuickActions } from "@/components/quick-actions"
import { SpendingChart } from "@/components/spending-chart"
import { TransactionList } from "@/components/transaction-list"
import { StatsGrid } from "@/components/stats-grid"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-[100px]" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-md px-4 pb-28 pt-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Good morning</p>
            <h1 className="text-xl font-bold text-white">Alex Johnson</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-full border border-white/10 bg-white/5 p-2.5 backdrop-blur-xl transition-all hover:bg-white/10">
              <Search className="h-5 w-5 text-white/70" />
            </button>
            <button className="relative rounded-full border border-white/10 bg-white/5 p-2.5 backdrop-blur-xl transition-all hover:bg-white/10">
              <Bell className="h-5 w-5 text-white/70" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-2.5 backdrop-blur-xl transition-all hover:bg-white/10">
              <Settings className="h-5 w-5 text-white/70" />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <BalanceCard />
            <QuickActions />
            <SpendingChart />
            <TransactionList />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="mb-1 text-xl font-bold text-white">Analytics</h2>
              <p className="text-sm text-white/60">
                Track your financial performance
              </p>
            </div>
            <SpendingChart />
            <StatsGrid />
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="mb-1 text-xl font-bold text-white">My Wallet</h2>
              <p className="text-sm text-white/60">Manage your crypto assets</p>
            </div>
            <BalanceCard />
            <StatsGrid />
          </div>
        )}

        {activeTab === "cards" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h2 className="mb-1 text-xl font-bold text-white">My Cards</h2>
              <p className="text-sm text-white/60">
                Manage your payment methods
              </p>
            </div>
            <BalanceCard />
            <QuickActions />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0f] text-2xl font-bold text-white">
                  AJ
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
              <p className="text-sm text-white/60">alex.johnson@email.com</p>
            </div>
            <StatsGrid />
            <TransactionList />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
