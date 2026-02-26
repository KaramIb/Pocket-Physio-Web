"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface PainChartProps {
  painHistory: number[];
  className?: string;
}

// Generate mock dates for the last N days
function generateDates(count: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
  }
  return dates;
}

export function PainChart({ painHistory, className }: PainChartProps) {
  // Extend pain history to 14 days with mock data if needed
  const extendedHistory = [...painHistory];
  while (extendedHistory.length < 14) {
    // Add some realistic variation
    const lastValue = extendedHistory[0] || 5;
    const variation = Math.random() * 2 - 1;
    const newValue = Math.max(0, Math.min(10, Math.round(lastValue + variation)));
    extendedHistory.unshift(newValue);
  }

  const dates = generateDates(extendedHistory.length);
  const chartData = dates.map((date, index) => ({
    date,
    pain: extendedHistory[index],
  }));

  // Calculate trend
  const recentPain = extendedHistory.slice(-4);
  const avgRecent = recentPain.reduce((a, b) => a + b, 0) / recentPain.length;
  const olderPain = extendedHistory.slice(-8, -4);
  const avgOlder = olderPain.reduce((a, b) => a + b, 0) / olderPain.length;
  const isTrendingUp = avgRecent > avgOlder + 0.5;
  const isTrendingDown = avgRecent < avgOlder - 0.5;

  // Use computed color values for Recharts
  const primaryColor = "#3B82F6";
  const warningColor = "#D97706";
  const chartLineColor = isTrendingUp ? warningColor : primaryColor;

  return (
    <Card
      className={cn(
        "p-4",
        isTrendingUp && "border-warning/50 bg-warning-bg/30",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Pain Trend
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Last 14 days</p>
        </div>
        {isTrendingUp && (
          <div className="flex items-center gap-1 rounded-full bg-warning-bg px-2 py-1 text-xs font-medium text-warning">
            <TrendingUp className="h-3 w-3" />
            Trending up
          </div>
        )}
        {isTrendingDown && (
          <div className="flex items-center gap-1 rounded-full bg-success-bg px-2 py-1 text-xs font-medium text-success">
            <TrendingDown className="h-3 w-3" />
            Improving
          </div>
        )}
      </div>

      <ChartContainer
        config={{
          pain: {
            label: "Pain Score",
            color: chartLineColor,
          },
        }}
        className="h-[180px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="date"
                  formatter={(value) => (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Pain Score</span>
                      <span className="font-mono font-medium">{value}/10</span>
                    </div>
                  )}
                />
              }
              cursor={{ stroke: "#E2E8F0" }}
            />
            <ReferenceLine y={5} stroke="#E2E8F0" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="pain"
              stroke={chartLineColor}
              strokeWidth={2}
              dot={{ fill: chartLineColor, strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: chartLineColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
