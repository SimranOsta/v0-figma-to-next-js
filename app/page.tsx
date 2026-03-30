"use client";

import { useState, useEffect } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { AQICard } from "@/components/aqi-card";
import { HealthProfile } from "@/components/health-profile";
import { CalibrationStatus } from "@/components/calibration-status";
import { AlertsList } from "@/components/alerts-list";
import { PollutantChart } from "@/components/pollutant-chart";
import { SplashScreen } from "@/components/splash-screen";
import { OnboardingForm, UserData } from "@/components/onboarding-form";
import { Shield, ChevronRight, LogOut } from "lucide-react";

type AppState = "splash" | "onboarding" | "dashboard";

function AppHeader({ userName }: { userName: string }) {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="pt-12 pb-4 px-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white font-bold text-lg">A+</span>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">Aero+</h1>
          <p className="text-white/70 text-sm">Welcome back, {userName}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{getInitials(userName)}</span>
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

const HEALTH_CONDITIONS = [
  { id: "asthma", label: "Asthma" },
  { id: "allergies", label: "Allergies" },
  { id: "heart", label: "Heart Condition" },
  { id: "copd", label: "COPD" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "none", label: "None" },
];

const ABOUT_AERO_TEXT = `Aero+ is an intelligent real-time air-quality monitoring system designed to help individuals make safer lifestyle choices in regions affected by severe and rapidly fluctuating pollution. The solution combines an Arduino-powered indoor pollution-tracking device with a companion mobile application that presents synchronized indoor and outdoor air-quality readings.

The indoor monitoring module is built around the MQ-135 gas sensor, which detects harmful pollutants such as CO₂, NH₃, NOx, benzene, and other airborne toxins. Before deployment, the sensor undergoes baseline calibration and offset adjustments to improve accuracy and long-term stability. The Arduino processes the sensor's analog output, converting it into meaningful AQI-based values. These readings are transmitted wirelessly to the user's smartphone through either a Wi-Fi-enabled ESP32 module or a Bluetooth module like the HC-05, enabling seamless, low-latency data transfer.

Aero+ actively detects sudden pollution spikes caused by common indoor activities—cooking, ventilation changes, nearby traffic emissions, poorly performing air purifiers, or open windows—and immediately notifies the user. The system further enhances safety by offering personalized health-risk alerts tailored to factors such as age, asthma, allergies, or other respiratory sensitivities. These customized warnings help high-risk users take timely preventive actions.

To prioritize user trust and data protection, all personal and health-related information is securely stored on the device itself, eliminating any need for cloud storage or external servers. This ensures complete privacy and prevents unauthorized access or data misuse.

Designed with highly polluted urban centers like Delhi in mind—where AQI levels can shift dramatically within hours—Aero+ empowers individuals to better understand their environment, maintain healthier indoor conditions, and make informed decisions about outdoor exposure. Ultimately, the system promotes environmental awareness, encourages preventive health practices, and supports safer living amidst rising urban pollution.`;

function ProfileTab({ 
  userData, 
  onLogout,
  onUpdateUser 
}: { 
  userData: UserData; 
  onLogout: () => void;
  onUpdateUser: (data: UserData) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [editName, setEditName] = useState(userData.name);
  const [editAge, setEditAge] = useState(userData.age);
  const [editConditions, setEditConditions] = useState<string[]>(userData.conditions);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getConditionLabel = (id: string) => {
    const labels: Record<string, string> = {
      asthma: "Asthma",
      allergies: "Allergies",
      heart: "Heart Condition",
      copd: "COPD",
      pregnancy: "Pregnancy",
      none: "None",
    };
    return labels[id] || id;
  };

  const toggleCondition = (conditionId: string) => {
    if (conditionId === "none") {
      setEditConditions(["none"]);
    } else {
      const filtered = editConditions.filter((c) => c !== "none");
      if (filtered.includes(conditionId)) {
        setEditConditions(filtered.filter((c) => c !== conditionId));
      } else {
        setEditConditions([...filtered, conditionId]);
      }
    }
  };

  const handleSaveProfile = () => {
    const updatedUser: UserData = {
      name: editName,
      age: editAge,
      conditions: editConditions.length > 0 ? editConditions : ["none"],
    };
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(userData.name);
    setEditAge(userData.age);
    setEditConditions(userData.conditions);
    setIsEditing(false);
  };

  // Edit Profile Modal
  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Profile</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Your age"
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Health Conditions</label>
              <div className="grid grid-cols-2 gap-3">
                {HEALTH_CONDITIONS.map((condition) => {
                  const isSelected = editConditions.includes(condition.id);
                  return (
                    <button
                      key={condition.id}
                      type="button"
                      onClick={() => toggleCondition(condition.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        isSelected
                          ? condition.id === "asthma"
                            ? "border-red-400 bg-red-50 text-red-600"
                            : "border-purple-400 bg-purple-50 text-purple-700"
                          : "border-gray-200 bg-gray-50/80 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-sm">{condition.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCancelEdit}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={!editName.trim() || !editAge}
              className="flex-1 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // About Aero+ Modal
  if (showAbout) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A+</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">About Aero+</h3>
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto pr-2">
              {ABOUT_AERO_TEXT}
            </div>
          </div>
          
          <button
            onClick={() => setShowAbout(false)}
            className="w-full mt-6 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">{getInitials(userData.name)}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{userData.name}</h3>
          <p className="text-gray-500">{userData.age} years old</p>
          
          {userData.conditions.length > 0 && !userData.conditions.includes("none") && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {userData.conditions.map((condition) => (
                <span
                  key={condition}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {getConditionLabel(condition)}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-xs text-gray-500">Days Active</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-xs text-gray-500">Alerts Acted</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/50">
        <h4 className="font-semibold text-gray-800 mb-3">Account Settings</h4>
        <div className="space-y-1">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/80 transition-colors"
          >
            <span className="text-gray-700">Edit Profile</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => setShowAbout(true)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/80 transition-colors"
          >
            <span className="text-gray-700">About Aero+</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}

export default function AeroPlusDashboard() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem("aero_user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setAppState("dashboard");
    }
  }, []);

  const handleSplashComplete = () => {
    const savedUser = localStorage.getItem("aero_user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setAppState("dashboard");
    } else {
      setAppState("onboarding");
    }
  };

  const handleOnboardingComplete = (data: UserData) => {
    localStorage.setItem("aero_user", JSON.stringify(data));
    setUserData(data);
    setAppState("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("aero_user");
    setUserData(null);
    setAppState("onboarding");
  };

  const handleUpdateUser = (data: UserData) => {
    localStorage.setItem("aero_user", JSON.stringify(data));
    setUserData(data);
  };

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
        return userData ? <ProfileTab userData={userData} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : null;
      default:
        return <HomeTab />;
    }
  };

  if (appState === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === "onboarding") {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-400 to-pink-400">
      <div className="mx-auto max-w-md min-h-screen pb-28">
        <AppHeader userName={userData?.name || "User"} />
        <main className="px-4">
          {renderContent()}
        </main>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
