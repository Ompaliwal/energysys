"use client";

import {
  Receipt,
  Wallet,
  Gauge,
  BellRing,
  ArrowUpRight,
} from "lucide-react";

export default function RecentActivities() {

  const activities = [
    {
      title:
        "Bill generated successfully",
      description:
        "Electricity bill generated for Consumer #1024",
      time: "2 mins ago",
      icon: Receipt,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },

    {
      title:
        "Payment collected",
      description:
        "₹4,500 payment received via UPI",
      time: "15 mins ago",
      icon: Wallet,
      bg: "bg-green-100",
      color: "text-green-600",
    },

    {
      title:
        "New meter reading added",
      description:
        "Meter reading updated for Block A",
      time: "1 hour ago",
      icon: Gauge,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },

    {
      title:
        "Notification sent",
      description:
        "Payment reminder sent to 24 consumers",
      time: "3 hours ago",
      icon: BellRing,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

      {/* HEADER */}
      <div className="p-8 border-b border-gray-100 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Recent Activities
          </h2>

          <p className="text-gray-500 mt-1">
            Latest updates from the smart energy system
          </p>

        </div>

        <button className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 text-blue-600 px-5 py-3 rounded-2xl flex items-center gap-2">

          View All

          <ArrowUpRight
            size={18}
          />

        </button>

      </div>

      {/* ACTIVITIES */}
      <div className="p-6 space-y-5">

        {activities.map(
          (
            activity,
            index
          ) => {

            const Icon =
              activity.icon;

            return (
              <div
                key={index}
                className="bg-[#f8fbff] hover:bg-blue-50 transition-all duration-300 rounded-3xl p-5 flex items-start gap-5"
              >

                {/* ICON */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activity.bg}`}
                >

                  <Icon
                    className={
                      activity.color
                    }
                    size={24}
                  />

                </div>

                {/* CONTENT */}
                <div className="flex-1">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">

                    <h3 className="text-lg font-semibold text-gray-900">

                      {
                        activity.title
                      }

                    </h3>

                    <span className="text-sm text-gray-400">

                      {
                        activity.time
                      }

                    </span>

                  </div>

                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">

                    {
                      activity.description
                    }

                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}