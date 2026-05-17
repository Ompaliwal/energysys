"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  CreditCard,
  Wallet,
} from "lucide-react";

interface Props {
  data: any[];
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function PaymentMethodChart({
  data,
}: Props) {

  const totalPayments =
    data?.reduce(
      (
        acc,
        item
      ) =>
        acc +
        item.value,
      0
    ) || 0;

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

      {/* HEADER */}
      <div className="p-8 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">

            <CreditCard
              className="text-white"
              size={30}
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              Payment Methods
            </h2>

            <p className="text-gray-500 mt-1">
              Distribution of payment collection methods
            </p>

          </div>

        </div>

        {/* TOTAL */}
        <div className="bg-blue-50 rounded-3xl px-6 py-5 min-w-[220px]">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Wallet
                className="text-blue-600"
                size={22}
              />

            </div>

            <div>

              <p className="text-sm text-blue-600">
                Total Payments
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mt-1">

                {totalPayments}

              </h3>

              <p className="text-xs text-blue-500 mt-1">
                Transactions
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

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={4}
              >

                {data.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* LEGENDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

          {data.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-[#f8fbff] rounded-2xl px-4 py-3 flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[
                          index %
                            COLORS.length
                        ],
                    }}
                  />

                  <p className="text-sm font-medium text-gray-700">

                    {item.name}

                  </p>

                </div>

                <span className="text-sm font-bold text-gray-900">

                  {item.value}

                </span>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}