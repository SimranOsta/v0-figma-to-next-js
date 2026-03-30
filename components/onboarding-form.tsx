"use client";

import { useState } from "react";
import { Wind, Heart, Flower2, Stethoscope, Baby, User, ChevronRight, MapPin } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (data: UserData) => void;
}

export interface UserData {
  name: string;
  age: string;
  location: string;
  conditions: string[];
}

const healthConditions = [
  { id: "asthma", label: "Asthma", icon: Wind, color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500" },
  { id: "allergies", label: "Allergies", icon: Flower2, color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500" },
  { id: "heart", label: "Heart Condition", icon: Heart, color: "text-pink-500", bgColor: "bg-pink-500/10", borderColor: "border-pink-500" },
  { id: "copd", label: "COPD", icon: Stethoscope, color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500" },
  { id: "pregnancy", label: "Pregnancy", icon: Baby, color: "text-cyan-300", bgColor: "bg-cyan-400/10", borderColor: "border-cyan-400" },
  { id: "none", label: "None", icon: User, color: "text-gray-400", bgColor: "bg-gray-500/10", borderColor: "border-gray-500" },
];

const POPULAR_CITIES = [
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Chennai, India",
  "Kolkata, India",
  "Hyderabad, India",
  "Pune, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Lucknow, India",
];

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (id: string) => {
    if (id === "none") {
      setSelectedConditions(["none"]);
    } else {
      setSelectedConditions((prev) => {
        const filtered = prev.filter((c) => c !== "none");
        if (filtered.includes(id)) {
          return filtered.filter((c) => c !== id);
        }
        return [...filtered, id];
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && age) {
      setStep(3);
    } else if (step === 3 && location.trim()) {
      setStep(4);
    }
  };

  const handleComplete = () => {
    onComplete({
      name: name.trim(),
      age: age,
      location: location.trim(),
      conditions: selectedConditions.length > 0 ? selectedConditions : ["none"],
    });
  };

  const canProceed =
    (step === 1 && name.trim().length > 0) ||
    (step === 2 && age && parseInt(age) > 0 && parseInt(age) < 120) ||
    (step === 3 && location.trim().length > 0) ||
    (step === 4 && selectedConditions.length > 0);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="mx-auto max-w-md w-full flex-1 flex flex-col px-5 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-black font-bold text-lg">A+</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Welcome to Aero+</h1>
            <p className="text-gray-500 text-sm">Let&apos;s personalize your experience</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-cyan-500" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                What&apos;s your name?
              </h2>
              <p className="text-gray-500 text-center mb-8">
                We&apos;ll use this to personalize your alerts
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎂</span>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                How old are you?
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Age-specific health recommendations
              </p>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                min="1"
                max="120"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center"
                autoFocus
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Where are you located?
              </h2>
              <p className="text-gray-500 text-center mb-6">
                We&apos;ll show you local air quality data
              </p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all mb-4"
                autoFocus
              />
              <p className="text-sm text-gray-500 mb-3">Popular cities:</p>
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-40">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setLocation(city)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      location === city
                        ? "bg-cyan-500 text-black"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Health Conditions
              </h2>
              <p className="text-gray-500 text-center mb-6">
                Select any that apply for personalized alerts
              </p>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {healthConditions.map((condition) => {
                  const Icon = condition.icon;
                  const isSelected = selectedConditions.includes(condition.id);
                  return (
                    <button
                      key={condition.id}
                      onClick={() => toggleCondition(condition.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? `${condition.bgColor} ${condition.borderColor}`
                          : "bg-white/5 border-transparent hover:border-white/20"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mb-2 ${
                          isSelected ? condition.color : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? condition.color : "text-gray-400"
                        }`}
                      >
                        {condition.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={step === 4 ? handleComplete : handleNext}
            disabled={!canProceed}
            className={`mt-6 w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              canProceed
                ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02]"
                : "bg-white/10 text-gray-500 cursor-not-allowed"
            }`}
          >
            {step === 4 ? "Get Started" : "Continue"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Skip option */}
        {step < 4 && (
          <button
            onClick={() => setStep(step + 1)}
            className="mt-4 text-gray-500 text-sm hover:text-white transition-colors mx-auto"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
