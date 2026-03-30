"use client";

import { useState } from "react";
import { Wind, Heart, Flower2, Stethoscope, Baby, User, ChevronRight } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (data: UserData) => void;
}

export interface UserData {
  name: string;
  age: number;
  conditions: string[];
}

const healthConditions = [
  { id: "asthma", label: "Asthma", icon: Wind, color: "text-red-500", bgColor: "bg-red-50", borderColor: "border-red-500" },
  { id: "allergies", label: "Allergies", icon: Flower2, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-500" },
  { id: "heart", label: "Heart Condition", icon: Heart, color: "text-pink-500", bgColor: "bg-pink-50", borderColor: "border-pink-500" },
  { id: "copd", label: "COPD", icon: Stethoscope, color: "text-blue-500", bgColor: "bg-blue-50", borderColor: "border-blue-500" },
  { id: "pregnancy", label: "Pregnancy", icon: Baby, color: "text-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-500" },
  { id: "none", label: "None", icon: User, color: "text-gray-500", bgColor: "bg-gray-50", borderColor: "border-gray-400" },
];

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
    }
  };

  const handleComplete = () => {
    onComplete({
      name: name.trim(),
      age: parseInt(age),
      conditions: selectedConditions,
    });
  };

  const canProceed =
    (step === 1 && name.trim().length > 0) ||
    (step === 2 && age && parseInt(age) > 0 && parseInt(age) < 120) ||
    (step === 3 && selectedConditions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 flex flex-col">
      <div className="mx-auto max-w-md w-full flex-1 flex flex-col px-5 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">A+</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Welcome to Aero+</h1>
            <p className="text-white/70 text-sm">Let&apos;s personalize your experience</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
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
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-800 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">🎂</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
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
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-800 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-center"
                autoFocus
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
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
                          : "bg-gray-50 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mb-2 ${
                          isSelected ? condition.color : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? condition.color : "text-gray-600"
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
            onClick={step === 3 ? handleComplete : handleNext}
            disabled={!canProceed}
            className={`mt-6 w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              canProceed
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step === 3 ? "Get Started" : "Continue"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Skip option */}
        {step < 3 && (
          <button
            onClick={() => setStep(step + 1)}
            className="mt-4 text-white/70 text-sm hover:text-white transition-colors mx-auto"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
