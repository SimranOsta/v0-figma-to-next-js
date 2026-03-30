"use client";

import { CheckCircle, Settings } from "lucide-react";

export function CalibrationStatus() {
  return (
    <div className="bg-cyan-500/10 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-cyan-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="font-semibold text-cyan-400">Calibrated & Stable</p>
            <p className="text-sm text-cyan-500/70">Last: 2 hours ago</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
