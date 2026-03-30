"use client";

import { Home, Bell, Lightbulb, Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "alerts", icon: Bell, label: "Alerts" },
  { id: "insights", icon: Lightbulb, label: "Insights" },
  { id: "privacy", icon: Shield, label: "Privacy" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-lg px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all duration-300",
                    isActive
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
