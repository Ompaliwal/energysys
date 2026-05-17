"use client";

import {
  Users,
  Cpu,
  Receipt,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface Props {
  stats: any;
}

export default function StatsCards({
  stats,
}: Props) {

  const cards = [
    {
      title:
        "Consumers",

      value:
        stats.totalConsumers,

      icon: Users,

      bg: "bg-blue-50",

      iconBg:
        "bg-blue-100",

      color:
        "text-blue-600",
    },

    {
      title:
        "Meters",

      value:
        stats.totalMeters,

      icon: Cpu,

      bg: "bg-purple-50",

      iconBg:
        "bg-purple-100",

      color:
        "text-purple-600",
    },

    {
      title:
        "Bills",

      value:
        stats.totalBills,

      icon: Receipt,

      bg: "bg-orange-50",

      iconBg:
        "bg-orange-100",

      color:
        "text-orange-600",
    },

    {
      title:
        "Revenue",

      value: `₹${stats.totalRevenue}`,

      icon:
        IndianRupee,

      bg: "bg-green-50",

      iconBg:
        "bg-green-100",

      color:
        "text-green-600",
    },

    {
      title:
        "Pending Bills",

      value:
        stats.pendingBills,

      icon:
        AlertCircle,

      bg: "bg-red-50",

      iconBg:
        "bg-red-100",

      color:
        "text-red-600",
    },

    {
      title:
        "Paid Bills",

      value:
        stats.paidBills,

      icon:
        CheckCircle2,

      bg: "bg-emerald-50",

      iconBg:
        "bg-emerald-100",

      color:
        "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

      {cards.map(
        (card) => {

          const Icon =
            card.icon;

          return (
            <div
              key={
                card.title
              }
              className={`${card.bg} rounded-[30px] p-7 shadow-[0_15px_50px_rgba(0,0,0,0.04)] hover:scale-[1.02] transition-all duration-300 overflow-hidden relative`}
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">

                    {
                      card.title
                    }

                  </p>

                  <h2 className="text-4xl font-bold text-gray-900 mt-3">

                    {
                      card.value
                    }

                  </h2>

                </div>

                {/* ICON */}
                <div
                  className={`${card.iconBg} w-16 h-16 rounded-3xl flex items-center justify-center`}
                >

                  <Icon
                    className={
                      card.color
                    }
                    size={30}
                  />

                </div>

              </div>

              {/* BOTTOM */}
              <div className="flex items-center gap-2 mt-6">

                <TrendingUp
                  size={16}
                  className={
                    card.color
                  }
                />

                <p className="text-sm text-gray-500">

                  System analytics updated in real-time

                </p>

              </div>

              {/* GLOW */}
              <div
                className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-20 blur-3xl ${card.iconBg}`}
              />

            </div>
          );
        }
      )}

    </div>
  );
}