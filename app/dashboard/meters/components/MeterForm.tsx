"use client";

import { useState } from "react";

import {
  Cpu,
  Hash,
  Zap,
  Activity,
  Factory,
  MapPin,
  Gauge,
  BatteryCharging,
} from "lucide-react";

export default function MeterForm() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    meterNumber: "",
    serialNumber: "",
    meterType: "Electric",
    phaseType: "Single",
    manufacturer: "",
    location: "",
    initialReading: 0,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/meters",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Failed to create meter");
        return;
      }

      alert("Meter created successfully");

      window.location.href =
        "/dashboard/meters";

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

          <Cpu
            className="text-white"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Add Smart Meter
          </h2>

          <p className="text-gray-500 mt-1">
            Register and configure a new electricity meter
          </p>

        </div>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Meter Number */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Meter Number
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Hash
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter meter number"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  meterNumber:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* Serial Number */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Serial Number
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Cpu
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter serial number"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  serialNumber:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* Meter Type */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Meter Type
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Zap
              size={18}
              className="text-blue-600"
            />

            <select
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  meterType:
                    e.target.value,
                })
              }
            >

              <option>
                Electric
              </option>

              <option>
                DG
              </option>

              <option>
                Solar
              </option>

            </select>

          </div>

        </div>

        {/* Phase Type */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Phase Type
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Activity
              size={18}
              className="text-blue-600"
            />

            <select
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  phaseType:
                    e.target.value,
                })
              }
            >

              <option>
                Single
              </option>

              <option>
                Three
              </option>

            </select>

          </div>

        </div>

        {/* Manufacturer */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Manufacturer
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Factory
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter manufacturer name"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  manufacturer:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* Location */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Installation Location
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <MapPin
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter installation location"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  location:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* Initial Reading */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Initial Reading
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Gauge
              size={18}
              className="text-blue-600"
            />

            <input
              type="number"
              placeholder="Enter initial reading"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  initialReading:
                    Number(
                      e.target.value
                    ),
                })
              }
            />

          </div>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold flex items-center gap-3"
      >

        <BatteryCharging size={20} />

        {loading
          ? "Creating Meter..."
          : "Create Meter"}

      </button>

    </div>
  );
}