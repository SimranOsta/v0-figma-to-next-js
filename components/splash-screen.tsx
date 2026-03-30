"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"zoom-in" | "zoom-out" | "fade-out">("zoom-in");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("zoom-out"), 800);
    const timer2 = setTimeout(() => setPhase("fade-out"), 2000);
    const timer3 = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center z-50 transition-opacity duration-500 ${
        phase === "fade-out" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 ${
            phase === "zoom-out" ? "scale-150" : "scale-100"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl transition-transform duration-1000 delay-100 ${
            phase === "zoom-out" ? "scale-150" : "scale-100"
          }`}
        />
      </div>

      {/* Logo container */}
      <div
        className={`relative flex flex-col items-center transition-all duration-700 ease-out ${
          phase === "zoom-in"
            ? "scale-150 opacity-0"
            : phase === "zoom-out"
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0"
        }`}
      >
        {/* Logo circle */}
        <div className="w-28 h-28 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center mb-6 shadow-2xl border border-white/40">
          <span className="text-5xl font-bold text-white tracking-tight">A+</span>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">Aero+</h1>
        <p className="text-white/80 text-lg">Air Quality Monitor</p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
