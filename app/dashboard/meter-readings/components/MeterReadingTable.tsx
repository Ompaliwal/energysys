"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Trash2,
  Zap,
  User,
  Cpu,
  Gauge,
  CalendarDays,
 Activity,
} from "lucide-react";

export default function MeterReadingTable() {
  const [readings, setReadings] =
    useState([]);

  const fetchReadings =
    async () => {
      try {

        const res = await fetch(
          "/api/meter-readings"
        );

        const data =
          await res.json();

        setReadings(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchReadings();
  }, []);

  const deleteReading =
    async (id: string) => {

      try {

        await fetch(
          `/api/meter-readings/${id}`,
          {
            method: "DELETE",
          }
        );

        fetchReadings();

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
              Consumer
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Meter
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Old
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              New
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Units
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Month
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Actions
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {readings.map(
            (reading: any) => (
              <tr
                key={reading._id}
                className="bg-[#f8fbff] shadow-sm hover:shadow-md transition-all duration-300"
              >

                {/* CONSUMER */}
                <td className="px-6 py-5 rounded-l-3xl">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                      <User
                        className="text-blue-600"
                        size={20}
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-900">
                        {
                          reading
                            .consumerId
                            ?.fullName
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Consumer
                      </p>

                    </div>

                  </div>

                </td>

                {/* METER */}
                <td className="px-6 py-5">

                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl">

                    <Cpu size={16} />

                    {
                      reading
                        .meterId
                        ?.meterNumber
                    }

                  </div>

                </td>

                {/* OLD */}
                <td className="px-6 py-5">

                  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl">

                    <Gauge size={16} />

                    {
                      reading.oldReading
                    }

                  </div>

                </td>

                {/* NEW */}
                <td className="px-6 py-5">

                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl">

                    <Activity
                      size={16}
                    />

                    {
                      reading.newReading
                    }

                  </div>

                </td>

                {/* UNITS */}
                <td className="px-6 py-5">

                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-2xl">

                    <Zap size={16} />

                    {
                      reading.unitsConsumed
                    }{" "}
                    Units

                  </div>

                </td>

                {/* MONTH */}
                <td className="px-6 py-5 text-gray-700">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={16}
                      className="text-blue-600"
                    />

                    {reading.month}

                  </div>

                </td>

                {/* ACTION */}
                <td className="px-6 py-5 rounded-r-3xl">

                  <button
                    onClick={() =>
                      deleteReading(
                        reading._id
                      )
                    }
                    className="bg-red-50 hover:bg-red-100 transition-all duration-300 text-red-600 px-4 py-2 rounded-2xl flex items-center gap-2"
                  >

                    <Trash2 size={16} />

                    Delete

                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}