"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

import {
  TrendingUp,
  Zap,
} from "lucide-react";

interface Props {
  data: any[];
}

export default function ConsumptionChart({
  data,
}: Props) {

  const totalUnits =
    data?.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.units,
      0
    ) || 0;

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

      {/* TOP HEADER */}
      <div className="p-8 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center gap-5">

   

          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              Monthly Consumption
            </h2>

            <p className="text-gray-500 mt-1">
              Electricity usage analytics and trends
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="bg-blue-50 rounded-3xl px-6 py-5 min-w-[220px]">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Zap
                className="text-blue-600"
                size={22}
              />

            </div>

            <div>

              <p className="text-sm text-blue-600">
                Total Consumption
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mt-1">

                {totalUnits}

              </h3>

              <p className="text-xs text-blue-500 mt-1">
                Units Consumed
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CHART */}
      <div className="p-6">

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="colorUnits"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="units"
                stroke="#2563eb"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorUnits)"
              />

              <Line
                type="monotone"
                dataKey="units"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 8,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}