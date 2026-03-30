"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { time: "6AM", co2: 420, nh3: 45, nox: 35 },
  { time: "9AM", co2: 480, nh3: 52, nox: 42 },
  { time: "12PM", co2: 520, nh3: 58, nox: 48 },
  { time: "3PM", co2: 490, nh3: 55, nox: 45 },
  { time: "6PM", co2: 580, nh3: 62, nox: 52 },
  { time: "9PM", co2: 460, nh3: 48, nox: 38 },
];

const pollutantStats = [
  { label: "CO₂", value: "520", unit: "ppm", color: "bg-cyan-500/20 text-cyan-400" },
  { label: "NH₃", value: "62", unit: "ppb", color: "bg-cyan-400/20 text-cyan-300" },
  { label: "NOₓ", value: "48", unit: "ppb", color: "bg-white/10 text-white" },
];

export function PollutantChart() {
  return (
    <div className="space-y-4">
      {/* Chart Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">24-Hour Pollutant Trends</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                domain={[0, 600]}
                ticks={[0, 150, 300, 450, 600]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
                  color: "#fff"
                }}
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: "#06b6d4", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="nh3"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: "#22d3ee", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="nox"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ fill: "#ffffff", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-sm text-cyan-400">CO₂ (ppm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-sm text-cyan-300">NH₃ (ppb)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white" />
            <span className="text-sm text-white">NOₓ (ppb)</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {pollutantStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-4 ${stat.color} backdrop-blur-sm border border-white/10`}
          >
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-70">{stat.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
