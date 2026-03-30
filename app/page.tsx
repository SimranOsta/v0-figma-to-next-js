"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { AQICard } from "@/components/aqi-card";
import { HealthProfile } from "@/components/health-profile";
import { CalibrationStatus } from "@/components/calibration-status";
import { AlertsList } from "@/components/alerts-list";
import { PollutantChart } from "@/components/pollutant-chart";
import { Shield, Settings, ChevronRight } from "lucide-react";

function AppHeader() {
  return (
    <header className="pt-12 pb-4 px-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white font-bold text-lg">A+</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Aero+</h1>
          <p className="text-white/70 text-sm">Air Quality Monitor</p>
        </div>
      </div>
    </header>
  );
}

function HomeTab() {
  return (
    <div className="space-y-4">
      <AQICard type="indoor" value={68} trend={-8} />
      <AQICard type="outdoor" value={142} trend={12} />
      <HealthProfile />
      <CalibrationStatus />
    </div>
  );
}

function AlertsTab() {
  return (
    <div className="space-y-4">
      <AlertsList />
    </div>
  );
}

function InsightsTab() {
  return (
    <div className="space-y-4">
      <PollutantChart />
    </div>
  );
}

function PrivacyTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
            <p className="text-sm text-gray-500">Manage your data preferences</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Location Tracking</p>
              <p className="text-sm text-gray-500">For outdoor AQI data</p>
            </div>
            <div className="w-12 h-7 bg-purple-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Health Data Sync</p>
              <p className="text-sm text-gray-500">Connect with health apps</p>
            </div>
            <div className="w-12 h-7 bg-purple-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50/80 rounded-2xl">
            <div>
              <p className="font-medium text-gray-800">Anonymous Analytics</p>
              <p className="text-sm text-gray-500">Help improve the app</p>
            </div>
            <div className="w-12 h-7 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
          <p className="text-gray-500">john.doe@email.com</p>
          
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">142</p>
              <p className="text-xs text-gray-500">Days Active</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">23</p>
              <p className="text-xs text-gray-500">Alerts Acted</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/50">
        <h4 className="font-semibold text-gray-800 mb-3">Account Settings</h4>
        <div className="space-y-1">
          {["Edit Profile", "Notification Preferences", "Device Management", "Help & Support", "About Aero+"].map((item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/80 transition-colors"
            >
              <span className="text-gray-700">{item}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AeroPlusDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "alerts":
        return <AlertsTab />;
      case "insights":
        return <InsightsTab />;
      case "privacy":
        return <PrivacyTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-400 to-pink-400">
      <div className="mx-auto max-w-md min-h-screen pb-28">
        <AppHeader />
        <main className="px-4">
          {renderContent()}
        </main>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
