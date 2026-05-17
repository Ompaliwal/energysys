"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Cpu,
  Trash2,
  Zap,
  Activity,
  Gauge,
} from "lucide-react";

export default function MeterTable() {
  const [meters, setMeters] =
    useState([]);

  const fetchMeters = async () => {
    try {
      const res = await fetch(
        "/api/meters"
      );

      const data = await res.json();

      setMeters(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeters();
  }, []);

  const deleteMeter = async (
    id: string
  ) => {
    try {
      await fetch(
        `/api/meters/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchMeters();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full border-separate border-spacing-y-4">

        {/* HEADER */}
        <thead>

          <tr>

            <th className="text-left text-gray-500 font-semibold px-6">
              Meter
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Serial Number
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Type
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Phase
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Status
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Actions
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {meters.map((meter: any) => (
            <tr
              key={meter._id}
              className="bg-[#f8fbff] shadow-sm hover:shadow-md transition-all duration-300"
            >

              {/* METER NUMBER */}
              <td className="px-6 py-5 rounded-l-3xl">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <Cpu
                      className="text-blue-600"
                      size={20}
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-gray-900">
                      {meter.meterNumber}
                    </p>

                    <p className="text-sm text-gray-500">
                      Smart Meter
                    </p>

                  </div>

                </div>

              </td>

              {/* SERIAL */}
              <td className="px-6 py-5 text-gray-700 font-medium">
                {meter.serialNumber}
              </td>

              {/* TYPE */}
              <td className="px-6 py-5">

                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl">

                  <Zap size={16} />

                  {meter.meterType}

                </div>

              </td>

              {/* PHASE */}
              <td className="px-6 py-5">

                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-2xl">

                  <Activity size={16} />

                  {meter.phaseType}

                </div>

              </td>

              {/* STATUS */}
              <td className="px-6 py-5">

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${
                    meter.status ===
                    "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >

                  <Gauge size={16} />

                  {meter.status}

                </div>

              </td>

              {/* ACTIONS */}
              <td className="px-6 py-5 rounded-r-3xl">

                <button
                  onClick={() =>
                    deleteMeter(
                      meter._id
                    )
                  }
                  className="bg-red-50 hover:bg-red-100 transition-all duration-300 text-red-600 px-4 py-2 rounded-2xl flex items-center gap-2"
                >

                  <Trash2 size={16} />

                  Delete

                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}