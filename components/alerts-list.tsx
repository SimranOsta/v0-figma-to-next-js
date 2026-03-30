"use client";

import { Car, TrendingUp, Clock } from "lucide-react";

interface Alert {
  id: string;
  icon: typeof Car;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  aqi: number;
  aqiColor: string;
  time: string;
  tags: { label: string; color: string }[];
}

const alerts: Alert[] = [
  {
    id: "1",
    icon: Car,
    iconBg: "bg-orange-500",
    iconColor: "text-white",
    title: "Traffic Pollution Spike",
    description: "NOx levels elevated due to rush hour traffic on nearby highways",
    aqi: 142,
    aqiColor: "text-orange-500",
    time: "45 min ago",
    tags: [
      { label: "Asthma Alert", color: "bg-red-500/20 text-red-400 border-red-500/30" },
      { label: "COPD Warning", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    ],
  },
  {
    id: "2",
    icon: TrendingUp,
    iconBg: "bg-cyan-500",
    iconColor: "text-black",
    title: "Indoor Air Quality Improving",
    description: "Ventilation has reduced indoor pollutants by 18%",
    aqi: 68,
    aqiColor: "text-cyan-400",
    time: "1 hour ago",
    tags: [],
  },
];

export function AlertsList() {
  return (
    <div className="space-y-4">
      {/* Alert Tags Header */}
      <div className="flex gap-2">
        <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
          Asthma Alert
        </span>
        <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium border border-cyan-500/30">
          Allergy Sensitive
        </span>
      </div>

      {/* Alert Cards */}
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.id}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 shadow-lg border border-white/10"
          >
            <div className="flex gap-4">
              <div className={`w-14 h-14 rounded-2xl ${alert.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-7 h-7 ${alert.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white leading-tight">{alert.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-gray-500">AQI:</span>
                  <span className={`text-lg font-bold ${alert.aqiColor}`}>{alert.aqi}</span>
                </div>
                {alert.tags.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {alert.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
