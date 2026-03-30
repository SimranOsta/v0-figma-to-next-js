"use client";

import { Wind, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { AQIGauge } from "./aqi-gauge";

interface AQICardProps {
  type: "indoor" | "outdoor";
  value: number;
  trend: number;
}

export function AQICard({ type, value, trend }: AQICardProps) {
  const isIndoor = type === "indoor";
  const TrendIcon = trend > 0 ? TrendingUp : TrendingDown;
  const trendColor = trend > 0 ? "text-orange-500" : "text-green-500";

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isIndoor ? (
            <Activity className="w-5 h-5 text-cyan-500" />
          ) : (
            <Wind className="w-5 h-5 text-orange-500" />
          )}
          <h3 className="text-lg font-semibold text-gray-800">
            {isIndoor ? "Indoor" : "Outdoor"} AQI
          </h3>
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {trend > 0 ? "+" : ""}{trend} from 1h ago
          </span>
        </div>
      </div>

      {/* Gauge */}
      <AQIGauge
        value={value}
        label={`${type} AQI`}
        trendValue={trend}
        sensorInfo={isIndoor ? "MQ-135 Sensor • ESP32 Connected" : "External API • Updated 5 min ago"}
      />
    </div>
  );
}
