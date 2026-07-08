"use client";

import { BarChart3, TrendingUp, FileText, Zap } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Total Generations",
      value: "0",
      icon: FileText,
      change: "+0%",
    },
    {
      label: "Credits Used",
      value: "0",
      icon: Zap,
      change: "0 remaining",
    },
    {
      label: "Most Used Tool",
      value: "—",
      icon: TrendingUp,
      change: "No data",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your AI tool usage and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No analytics data yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start using AI tools to see your analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
