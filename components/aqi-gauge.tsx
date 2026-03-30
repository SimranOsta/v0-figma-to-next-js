"use client";

import { useEffect, useState } from "react";

interface AQIGaugeProps {
  value: number;
  label: string;
  showTrend?: boolean;
  trendValue?: number;
  sensorInfo?: string;
}

function getAQIColor(value: number): string {
  if (value <= 50) return "#06b6d4"; // Good - Cyan
  if (value <= 100) return "#22d3ee"; // Moderate - Light Cyan
  if (value <= 150) return "#f59e0b"; // Unhealthy for Sensitive - Amber
  if (value <= 200) return "#f97316"; // Unhealthy - Orange
  if (value <= 300) return "#ef4444"; // Very Unhealthy - Red
  return "#7f1d1d"; // Hazardous - Dark Red
}

function getAQIStatus(value: number): string {
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy for Sensitive";
  if (value <= 200) return "Unhealthy";
  if (value <= 300) return "Very Unhealthy";
  return "Hazardous";
}

function getStatusColor(value: number): string {
  if (value <= 50) return "bg-cyan-500/20 text-cyan-400";
  if (value <= 100) return "bg-cyan-400/20 text-cyan-300";
  if (value <= 150) return "bg-amber-500/20 text-amber-400";
  if (value <= 200) return "bg-orange-500/20 text-orange-400";
  return "bg-red-500/20 text-red-400";
}

export function AQIGauge({ value, sensorInfo }: AQIGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const color = getAQIColor(value);
  const status = getAQIStatus(value);
  const statusColor = getStatusColor(value);
  
  // Calculate stroke dash for the arc (270 degrees = 3/4 of circle)
  const circumference = 2 * Math.PI * 90;
  const arcLength = circumference * 0.75; // 270 degrees
  const progress = (animatedValue / 300) * arcLength;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52">
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 200 200">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-6xl font-bold transition-colors duration-500"
            style={{ color }}
          >
            {animatedValue}
          </span>
          <span className="text-gray-500 text-sm mt-1">AQI</span>
        </div>
      </div>

      {/* Status badge */}
      <div className={`px-6 py-2 rounded-full mt-2 ${statusColor}`}>
        <span className="font-medium text-sm">{status}</span>
      </div>

      {/* AQI Scale */}
      <div className="w-full mt-6">
        <div className="flex h-2 rounded-full overflow-hidden">
          <div className="flex-1 bg-cyan-500" />
          <div className="flex-1 bg-cyan-400" />
          <div className="flex-1 bg-amber-500" />
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-red-900" />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>300+</span>
        </div>
      </div>

      {/* Sensor info */}
      {sensorInfo && (
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>{sensorInfo}</span>
        </div>
      )}
    </div>
  );
}
