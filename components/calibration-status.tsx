"use client";

import { CheckCircle, Settings } from "lucide-react";

export function CalibrationStatus() {
  return (
    <div className="bg-green-50/90 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-green-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-green-700">Calibrated & Stable</p>
            <p className="text-sm text-green-600">Last: 2 hours ago</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-green-100 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
