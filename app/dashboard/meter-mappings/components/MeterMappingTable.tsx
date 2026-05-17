"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  User,
  Cpu,
  Trash2,
  CalendarDays,
  Activity,
} from "lucide-react";

export default function MeterMappingTable() {
  const [mappings, setMappings] =
    useState([]);

  const fetchMappings =
    async () => {
      try {
        const res = await fetch(
          "/api/meter-mappings"
        );

        const data =
          await res.json();

        setMappings(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchMappings();
  }, []);

  const deleteMapping =
    async (id: string) => {
      try {
        await fetch(
          `/api/meter-mappings/${id}`,
          {
            method: "DELETE",
          }
        );

        fetchMappings();

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
              Status
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Start Date
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Actions
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {mappings.map(
            (mapping: any) => (
              <tr
                key={mapping._id}
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
                          mapping
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
                      mapping
                        .meterId
                        ?.meterNumber
                    }

                  </div>

                </td>

                {/* STATUS */}
                <td className="px-6 py-5">

                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${
                      mapping.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >

                    <Activity size={16} />

                    {mapping.isActive
                      ? "Active"
                      : "Inactive"}

                  </div>

                </td>

                {/* DATE */}
                <td className="px-6 py-5 text-gray-700">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={16}
                      className="text-blue-600"
                    />

                    {new Date(
                      mapping.startDate
                    ).toLocaleDateString()}

                  </div>

                </td>

                {/* ACTION */}
                <td className="px-6 py-5 rounded-r-3xl">

                  <button
                    onClick={() =>
                      deleteMapping(
                        mapping._id
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