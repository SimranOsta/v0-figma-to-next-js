"use client";

import { useState } from "react";
import { Wind, Droplets, Heart, User } from "lucide-react";

const healthConditions = [
  { id: "asthma", icon: Wind, label: "Asthma", color: "red" },
  { id: "allergies", icon: Droplets, label: "Allergies", color: "gray" },
  { id: "heart", icon: Heart, label: "Heart Condition", color: "gray" },
  { id: "none", icon: User, label: "None", color: "gray" },
];

export function HealthProfile() {
  const [selected, setSelected] = useState("asthma");

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Health Profile</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {healthConditions.map((condition) => {
          const Icon = condition.icon;
          const isSelected = selected === condition.id;
          const isAsthma = condition.id === "asthma";

          return (
            <button
              key={condition.id}
              onClick={() => setSelected(condition.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 ${
                isSelected && isAsthma
                  ? "bg-red-500/10 border-2 border-red-500"
                  : isSelected
                  ? "bg-cyan-500/10 border-2 border-cyan-500"
                  : "bg-white/5 border-2 border-transparent hover:bg-white/10"
              }`}
            >
              <Icon
                className={`w-6 h-6 mb-2 ${
                  isSelected && isAsthma
                    ? "text-red-500"
                    : isSelected
                    ? "text-cyan-400"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isSelected && isAsthma
                    ? "text-red-500"
                    : isSelected
                    ? "text-cyan-400"
                    : "text-gray-400"
                }`}
              >
                {condition.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
        <p className="text-sm text-cyan-400">
          Alerts and recommendations are now personalized for your{" "}
          {selected === "none" ? "general health" : selected} condition.
        </p>
      </div>
    </div>
  );
}
