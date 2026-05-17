"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Zap,
  Gauge,
  User,
  Cpu,
  FileText,
  CalendarDays,
  Activity,
} from "lucide-react";

interface Mapping {
  _id: string;

  consumerId: {
    _id: string;
    fullName: string;
  };

  meterId: {
    _id: string;
    meterNumber: string;
  };

  isActive: boolean;
}

export default function MeterReadingForm() {

  const [loading, setLoading] =
    useState(false);

  const [mappings, setMappings] =
    useState<Mapping[]>([]);

  const [oldReading, setOldReading] =
    useState(0);

  const [
    unitsConsumed,
    setUnitsConsumed,
  ] = useState(0);

  const [form, setForm] = useState({
    consumerId: "",
    meterId: "",
    oldReading: 0,
    newReading: 0,
    month: "",
    remarks: "",
  });

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings =
    async () => {
      try {

        const res = await fetch(
          "/api/meter-mappings"
        );

        const data =
          await res.json();

        setMappings(
          data.filter(
            (m: Mapping) =>
              m.isActive
          )
        );

      } catch (error) {
        console.log(error);
      }
    };

  const fetchLatestReading =
    async (meterId: string) => {

      try {

        const res = await fetch(
          `/api/meter-readings/latest/${meterId}`
        );

        const data =
          await res.json();

        if (data) {

          setOldReading(
            data.newReading
          );

          setForm((prev) => ({
            ...prev,
            meterId,
            oldReading:
              data.newReading,
          }));

        } else {

          setOldReading(0);

          setForm((prev) => ({
            ...prev,
            meterId,
            oldReading: 0,
          }));
        }

      } catch (error) {
        console.log(error);
      }
    };

  const handleNewReading =
    (value: number) => {

      setForm((prev) => ({
        ...prev,
        newReading: value,
      }));

      setUnitsConsumed(
        value - oldReading
      );
    };

  const handleSubmit =
    async () => {

      try {

        if (
          form.newReading <
          oldReading
        ) {

          alert(
            "New reading cannot be less than old reading"
          );

          return;
        }

        setLoading(true);

        await fetch(
          "/api/meter-readings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...form,
              oldReading,
              unitsConsumed,
            }),
          }
        );

        alert(
          "Reading saved successfully"
        );

        window.location.href =
          "/dashboard/meter-readings";

      } catch (error) {

        console.log(error);

        alert("Something went wrong");

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl">

          <Zap
            className="text-white"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Add Meter Reading
          </h2>

          <p className="text-gray-500 mt-1">
            Record smart electricity meter readings
          </p>

        </div>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SELECT METER */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Select Meter
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Cpu
              size={18}
              className="text-blue-600"
            />

            <select
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) => {

                const selected =
                  mappings.find(
                    (m) =>
                      m.meterId._id ===
                      e.target.value
                  );

                if (selected) {

                  setForm((prev) => ({
                    ...prev,

                    consumerId:
                      selected.consumerId
                        ._id,

                    meterId:
                      selected.meterId
                        ._id,
                  }));

                  fetchLatestReading(
                    selected.meterId
                      ._id
                  );
                }
              }}
            >

              <option value="">
                Select Meter
              </option>

              {mappings.map(
                (mapping) => (
                  <option
                    key={
                      mapping._id
                    }
                    value={
                      mapping.meterId
                        ._id
                    }
                  >

                    {
                      mapping.meterId
                        .meterNumber
                    }

                    {" - "}

                    {
                      mapping.consumerId
                        .fullName
                    }

                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* MONTH */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Billing Month
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <CalendarDays
              size={18}
              className="text-blue-600"
            />

            <input
              type="month"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  month:
                    e.target.value,
                }))
              }
            />

          </div>

        </div>

        {/* OLD READING */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Old Reading
          </label>

          <div className="flex items-center bg-gray-100 rounded-2xl px-4 shadow-sm">

            <Gauge
              size={18}
              className="text-gray-500"
            />

            <input
              type="number"
              value={oldReading}
              disabled
              placeholder="Old Reading"
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

          </div>

        </div>

        {/* NEW READING */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            New Reading
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Activity
              size={18}
              className="text-blue-600"
            />

            <input
              type="number"
              placeholder="Enter new reading"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                handleNewReading(
                  Number(
                    e.target.value
                  )
                )
              }
            />

          </div>

        </div>

        {/* UNITS */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Units Consumed
          </label>

          <div className="flex items-center bg-yellow-50 rounded-2xl px-4 shadow-sm">

            <Zap
              size={18}
              className="text-yellow-600"
            />

            <input
              type="number"
              value={unitsConsumed}
              disabled
              placeholder="Units Consumed"
              className="w-full bg-transparent px-3 py-4 outline-none text-yellow-700 font-semibold"
            />

          </div>

        </div>

      </div>

      {/* REMARKS */}
      <div className="mt-6">

        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Remarks
        </label>

        <div className="flex items-start bg-[#f8fbff] rounded-2xl px-4 py-4 shadow-sm">

          <FileText
            size={18}
            className="text-blue-600 mt-1"
          />

          <textarea
            placeholder="Enter remarks"
            className="w-full bg-transparent px-3 outline-none resize-none h-28"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                remarks:
                  e.target.value,
              }))
            }
          />

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold"
      >
        {loading
          ? "Saving Reading..."
          : "Save Reading"}
      </button>

    </div>
  );
}