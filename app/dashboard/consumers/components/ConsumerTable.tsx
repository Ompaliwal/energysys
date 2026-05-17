"use client";

import { useEffect, useState } from "react";

import {
  Trash2,
  User,
} from "lucide-react";

export default function ConsumerTable() {
  const [consumers, setConsumers] =
    useState([]);

  const fetchConsumers = async () => {
    const res = await fetch(
      "/api/consumers"
    );

    const data = await res.json();

    setConsumers(data);
  };

  useEffect(() => {
    fetchConsumers();
  }, []);

  const deleteConsumer = async (
    id: string
  ) => {
    await fetch(`/api/consumers/${id}`, {
      method: "DELETE",
    });

    fetchConsumers();
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full border-separate border-spacing-y-4">

        <thead>

          <tr>

            <th className="text-left text-gray-500 font-semibold px-6">
              Consumer
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Meter
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Mobile
            </th>

            <th className="text-left text-gray-500 font-semibold px-6">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {consumers.map((consumer: any) => (
            <tr
              key={consumer._id}
              className="bg-[#f8fbff] shadow-sm rounded-2xl"
            >

              <td className="px-6 py-5 rounded-l-2xl">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <User
                      className="text-blue-600"
                      size={20}
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-gray-900">
                      {consumer.fullName}
                    </p>

                    <p className="text-sm text-gray-500">
                      #{consumer.consumerNumber}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5 text-gray-700">
                {consumer.meterNumber}
              </td>

              <td className="px-6 py-5 text-gray-700">
                {consumer.mobile}
              </td>

              <td className="px-6 py-5 rounded-r-2xl">

                <button
                  onClick={() =>
                    deleteConsumer(
                      consumer._id
                    )
                  }
                  className="bg-red-50 hover:bg-red-100 transition text-red-600 px-4 py-2 rounded-xl flex items-center gap-2"
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