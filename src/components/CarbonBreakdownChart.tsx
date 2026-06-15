"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardChartData } from "@/services/dashboard";

interface CarbonBreakdownChartProps {
  data: DashboardChartData[];
}

export function CarbonBreakdownChart({ data }: CarbonBreakdownChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Category Breakdown Bar Chart */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Carbon Source Breakdown (tons CO₂/yr)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: -10, right: 10, top: 10, bottom: 10 }}>
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Proportional Distribution Pie Chart */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">Impact Distribution</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Proportional contribution of your habits</p>
        </div>
        <div className="h-48 my-4 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-[hsl(var(--foreground))]">{total.toFixed(2)}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--muted-foreground))]">Tons Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-around text-xs mt-2 border-t border-[hsl(var(--border))] pt-3">
          {data.map((item) => {
            const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-[hsl(var(--foreground))]">{item.name}</span>
                <span className="text-[hsl(var(--muted-foreground))]">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
