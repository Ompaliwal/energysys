"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import {
  Gauge,
  Zap,
  Activity,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

export default function MyReadingsPage() {

  const [readings,
    setReadings] =
    useState<any[]>([]);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings =
    async () => {

      const res = await fetch(
        "/api/consumer-portal/readings"
      );

      const data =
        await res.json();

      setReadings(data);
    };

  const totalUnits =
    readings.reduce(
      (
        acc,
        reading
      ) =>
        acc +
        reading.unitsConsumed,
      0
    );

  return (
    <div className="min-h-screen flex bg-[#f5f9ff]">

      <DashboardSidebar />

      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">

              <Gauge
                className="text-white"
                size={38}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">

                My Readings

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                Track electricity meter readings and unit consumption

              </p>

            </div>

          </div>

          {/* SUMMARY */}
          <div className="bg-yellow-50 rounded-3xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <Zap
                  className="text-yellow-600"
                  size={28}
                />

              </div>

              <div>

                <p className="text-yellow-700 text-sm">

                  Total Units Consumed

                </p>

                <h2 className="text-4xl font-bold text-yellow-700 mt-1">

                  {totalUnits}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* TOP */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Meter Reading History

              </h2>

              <p className="text-gray-500 mt-1">

                Monthly electricity consumption details

              </p>

            </div>

            <div className="bg-[#f8fbff] px-5 py-3 rounded-2xl">

              <p className="text-sm text-gray-500">

                Total Records

              </p>

              <h3 className="text-2xl font-bold text-yellow-600 mt-1">

                {readings.length}

              </h3>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-[#f8fbff] border-b border-gray-100">

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Month

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Old Reading

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    New Reading

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Units Consumed

                  </th>

                </tr>

              </thead>

              <tbody>

                {readings.map(
                  (
                    reading
                  ) => (

                    <tr
                      key={
                        reading._id
                      }
                      className="border-b border-gray-100 hover:bg-[#f8fbff] transition-all duration-300"
                    >

                      {/* MONTH */}
                      <td className="p-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <CalendarDays
                              className="text-blue-600"
                              size={22}
                            />

                          </div>

                          <div>

                            <h3 className="font-semibold text-gray-900">

                              {
                                reading.month
                              }

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                              Billing Month

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* OLD READING */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <Activity
                            className="text-gray-500"
                            size={18}
                          />

                          <span className="font-semibold text-gray-900">

                            {
                              reading.oldReading
                            }

                          </span>

                        </div>

                      </td>

                      {/* NEW READING */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <Gauge
                            className="text-green-600"
                            size={18}
                          />

                          <span className="font-semibold text-gray-900">

                            {
                              reading.newReading
                            }

                          </span>

                        </div>

                      </td>

                      {/* UNITS */}
                      <td className="p-5">

                        <div className="inline-flex items-center gap-3 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl">

                          <TrendingUp
                            size={18}
                          />

                          <span className="font-bold">

                            {
                              reading.unitsConsumed
                            }{" "}
                            Units

                          </span>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}