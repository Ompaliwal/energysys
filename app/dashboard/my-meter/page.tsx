"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import {
  Gauge,
  Cpu,
  Activity,
  Zap,
  CheckCircle2,
  Hash,
} from "lucide-react";

export default function MyMeterPage() {

  const [meter, setMeter] =
    useState<any>(null);

  useEffect(() => {
    fetchMeter();
  }, []);

  const fetchMeter =
    async () => {

      const res = await fetch(
        "/api/consumer-portal/meter"
      );

      const data =
        await res.json();

      setMeter(data);
    };

  return (
    <div className="min-h-screen flex bg-[#f5f9ff]">

      <DashboardSidebar />

      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">

              <Gauge
                className="text-white"
                size={38}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">

                My Meter

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                Smart electricity meter details and usage information

              </p>

            </div>

          </div>

          {/* STATUS */}
          {meter && (
            <div className="bg-green-50 rounded-3xl px-8 py-6 min-w-[260px]">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                  <CheckCircle2
                    className="text-green-600"
                    size={28}
                  />

                </div>

                <div>

                  <p className="text-green-600 text-sm">

                    Meter Status

                  </p>

                  <h2 className="text-3xl font-bold text-green-700 mt-1">

                    {meter.status}

                  </h2>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* METER CARD */}
        {meter && (

          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">

            {/* TOP */}
            <div className="px-8 py-7 border-b border-gray-100 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-900">

                  Meter Information

                </h2>

                <p className="text-gray-500 mt-1">

                  Complete smart meter configuration and details

                </p>

              </div>

              <div className="bg-blue-50 px-5 py-3 rounded-2xl">

                <p className="text-sm text-gray-500">

                  Current Reading

                </p>

                <h3 className="text-2xl font-bold text-blue-600 mt-1">

                  {meter.currentReading}

                </h3>

              </div>

            </div>

            {/* DETAILS */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* METER NUMBER */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">

                  <Hash
                    className="text-blue-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Meter Number

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.meterNumber}

                </h2>

              </div>

              {/* SERIAL */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">

                  <Cpu
                    className="text-purple-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Serial Number

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.serialNumber}

                </h2>

              </div>

              {/* TYPE */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">

                  <Zap
                    className="text-orange-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Meter Type

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.meterType}

                </h2>

              </div>

              {/* PHASE */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-5">

                  <Activity
                    className="text-pink-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Phase Type

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.phaseType}

                </h2>

              </div>

              {/* READING */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">

                  <Gauge
                    className="text-green-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Current Reading

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.currentReading}

                </h2>

              </div>

              {/* STATUS */}
              <div className="bg-[#f8fbff] rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5">

                  <CheckCircle2
                    className="text-emerald-600"
                    size={24}
                  />

                </div>

                <p className="text-gray-500 text-sm">

                  Status

                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-2">

                  {meter.status}

                </h2>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}