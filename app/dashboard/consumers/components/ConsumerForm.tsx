"use client";

import { useState } from "react";

import {
  User,
  Hash,
  Phone,
  MapPin,
  Zap,
  Mail,
  Activity,
  BatteryCharging,
} from "lucide-react";

export default function ConsumerForm() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    consumerNumber: "",
    fullName: "",
    meterNumber: "",
    mobile: "",
    email: "",
    address: "",
    tariffCategory: "",
    sanctionedLoad: "",
    status: "Active",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/consumers",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,

            sanctionedLoad: Number(
              form.sanctionedLoad
            ),
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();

        alert(
          data.error ||
            "Failed to add consumer"
        );

        return;
      }

      alert("Consumer added successfully");

      window.location.href =
        "/dashboard/consumers";

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
            Add Consumer
          </h2>

          <p className="text-gray-500 mt-1">
            Register a new electricity consumer
          </p>

        </div>

      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Consumer Number */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Consumer Number
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Hash
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter consumer number"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  consumerNumber:
                    e.target.value,
                })
              }
            />

          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Full Name
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <User
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter full name"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName:
                    e.target.value,
                })
              }
            />

          </div>
        </div>

        {/* Meter Number */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Meter Number
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Zap
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

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Mobile Number
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Phone
              size={18}
              className="text-blue-600"
            />

            <input
              placeholder="Enter mobile number"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile:
                    e.target.value,
                })
              }
            />

          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Email Address
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Mail
              size={18}
              className="text-blue-600"
            />

            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
            />

          </div>
        </div>

        {/* TARIFF CATEGORY */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Tariff Category
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
                  tariffCategory:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select category
              </option>

              <option value="Residential">
                Residential
              </option>

              <option value="Commercial">
                Commercial
              </option>

              <option value="Industrial">
                Industrial
              </option>

            </select>

          </div>
        </div>

        {/* SANCTIONED LOAD */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Sanctioned Load (kW)
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <BatteryCharging
              size={18}
              className="text-blue-600"
            />

            <input
              type="number"
              placeholder="Enter sanctioned load"
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  sanctionedLoad:
                    e.target.value,
                })
              }
            />

          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Consumer Status
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <select
              className="w-full bg-transparent py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value,
                })
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>
        </div>

      </div>

      {/* ADDRESS */}
      <div className="mt-6">

        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Address
        </label>

        <div className="flex items-start bg-[#f8fbff] rounded-2xl px-4 py-4 shadow-sm">

          <MapPin
            size={18}
            className="text-blue-600 mt-1"
          />

          <textarea
            placeholder="Enter address"
            className="w-full bg-transparent px-3 outline-none resize-none h-28"
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
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
          ? "Adding Consumer..."
          : "Add Consumer"}
      </button>

    </div>
  );
}