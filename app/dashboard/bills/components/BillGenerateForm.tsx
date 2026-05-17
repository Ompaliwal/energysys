"use client";

import { useState } from "react";

import {
  Zap,
  FileText,
  Sparkles,
} from "lucide-react";

export default function BillGenerateForm() {

  const [loading, setLoading] =
    useState(false);

  const generateBills =
    async () => {

      try {

        setLoading(true);

        await fetch(
          "/api/bills/generate",
          {
            method: "POST",
          }
        );

        alert(
          "Bills generated successfully"
        );

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate bills"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10 mb-8 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* LEFT */}
        <div className="max-w-2xl">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl">

              <FileText
                className="text-white"
                size={30}
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Generate Bills
              </h2>

              <p className="text-gray-500 mt-1">
                Automatically generate electricity bills
                using latest meter readings.
              </p>

            </div>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-[#f8fbff] rounded-2xl p-4">

              <Zap
                className="text-blue-600 mb-3"
                size={22}
              />

              <h3 className="font-semibold text-gray-900">
                Auto Calculation
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Units and bill amount generated automatically.
              </p>

            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-4">

              <FileText
                className="text-blue-600 mb-3"
                size={22}
              />

              <h3 className="font-semibold text-gray-900">
                PDF Bills
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Download and manage generated electricity bills.
              </p>

            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-4">

              <Sparkles
                className="text-blue-600 mb-3"
                size={22}
              />

              <h3 className="font-semibold text-gray-900">
                Smart Billing
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Generate all monthly bills in one click.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center">

          <button
            onClick={generateBills}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-white px-10 py-5 rounded-3xl shadow-2xl text-lg font-semibold"
          >

            {loading
              ? "Generating Bills..."
              : "Generate All Bills"}

          </button>

        </div>

      </div>

    </div>
  );
}