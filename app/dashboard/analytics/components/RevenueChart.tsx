"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

interface Props {
  data: any[];
}

export default function RevenueChart({
  data,
}: Props) {

  const totalRevenue =
    data?.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.revenue,
      0
    ) || 0;

  const highestRevenue =
    Math.max(
      ...data.map(
        (item) =>
          item.revenue
      ),
      0
    );

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

      {/* HEADER */}
      <div className="p-8 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center gap-5">

    

          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              Monthly Revenue
            </h2>

            <p className="text-gray-500 mt-1">
              Revenue analytics and monthly collection overview
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="flex gap-4 flex-wrap">

          {/* TOTAL */}
          <div className="bg-green-50 rounded-3xl px-6 py-5 min-w-[220px]">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                <IndianRupee
                  className="text-green-600"
                  size={22}
                />

              </div>

              <div>

                <p className="text-sm text-green-600">
                  Total Revenue
                </p>

                <h3 className="text-3xl font-bold text-green-700 mt-1">

                  ₹
                  {totalRevenue}

                </h3>

              </div>

            </div>

          </div>

          {/* HIGHEST */}
          <div className="bg-blue-50 rounded-3xl px-6 py-5 min-w-[220px]">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                <TrendingUp
                  className="text-blue-600"
                  size={22}
                />

              </div>

              <div>

                <p className="text-sm text-blue-600">
                  Highest Revenue
                </p>

                <h3 className="text-3xl font-bold text-blue-700 mt-1">

                  ₹
                  {highestRevenue}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CHART */}
      <div className="p-6">

        <div className="h-[380px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data}
              barCategoryGap={25}
            >

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
                cursor={{
                  fill:
                    "rgba(37,99,235,0.05)",
                }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="revenue"
                radius={[
                  12,
                  12,
                  0,
                  0,
                ]}
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}