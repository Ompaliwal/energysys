"use client";

import Link from "next/link";

import { useState } from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import ConsumerTable from "./components/ConsumerTable";

import {
  Users,
  Plus,
  Upload,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function UploadExcel() {
  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch(
        "/api/consumers/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.error || "Upload failed"
        );

        return;
      }

      alert(
        "Consumers uploaded successfully"
      );

    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">

      <div className="flex flex-col items-center justify-center text-center">

        {/* ICON */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-8 shadow-inner">

          <FileSpreadsheet
            className="text-blue-700"
            size={42}
          />

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Upload Consumer Excel File
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl leading-relaxed text-lg">
          Import electricity consumer records instantly
          using Excel or CSV files.
        </p>

        {/* FILE NAME */}
        {fileName && (
          <div className="mt-6 flex items-center gap-2 bg-green-50 text-green-700 px-5 py-3 rounded-2xl">

            <CheckCircle2 size={18} />

            <span className="font-medium">
              {fileName}
            </span>

          </div>
        )}

        {/* BUTTON */}
        <label className="mt-10 cursor-pointer">

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold flex items-center gap-3">

            <Upload size={22} />

            {loading
              ? "Uploading..."
              : "Choose Excel File"}

          </div>

        </label>

        {/* SUPPORT TEXT */}
        <p className="text-sm text-gray-400 mt-5">
          Supported formats: .xlsx .xls .csv
        </p>

      </div>

    </div>
  );
}

export default function ConsumersPage() {
  return (
    <div className="min-h-screen bg-[#f6f9ff] flex">

      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* TOP HEADER */}
        <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl px-8 py-6 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">

                <Users className="text-white" size={30} />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  Consumers
                </h1>

                <p className="text-gray-500 mt-1 text-lg">
                  Manage electricity consumers seamlessly
                </p>

              </div>

            </div>

            {/* BUTTON */}
            <Link
              href="/dashboard/consumers/create"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-7 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 font-medium w-fit"
            >

              <Plus size={20} />

              Add Consumer

            </Link>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-10 text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)]">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

              {/* LEFT */}
              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">

                  <Sparkles size={16} />

                  <span className="text-sm font-medium">
                    Smart Consumer Management
                  </span>

                </div>

                <h2 className="text-5xl font-bold leading-tight tracking-tight">
                  Modern Consumer
                  <br />
                  Management System
                </h2>

                <p className="mt-5 text-blue-100 text-lg leading-relaxed max-w-xl">
                  Add consumers, upload Excel sheets,
                  manage records and maintain electricity
                  billing workflows from a centralized dashboard.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">

                  <Link
                    href="/dashboard/consumers/create"
                    className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 px-7 py-3.5 rounded-2xl font-semibold shadow-2xl flex items-center gap-2"
                  >

                    <Plus size={18} />

                    Add Consumer

                  </Link>

                </div>

              </div>

              {/* RIGHT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 min-w-[240px]">

                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">

                    <Users size={28} />

                  </div>

                  <h3 className="text-2xl font-semibold">
                    Consumer Records
                  </h3>

                  <p className="text-blue-100 mt-3 leading-relaxed">
                    Access and manage all consumer profiles efficiently.
                  </p>

                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 min-w-[240px]">

                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">

                    <FileSpreadsheet size={28} />

                  </div>

                  <h3 className="text-2xl font-semibold">
                    Excel Upload
                  </h3>

                  <p className="text-blue-100 mt-3 leading-relaxed">
                    Upload consumer records instantly using Excel files.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* BULK UPLOAD */}
          <section className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

            {/* HEADER */}
            <div className="px-8 py-7 bg-gradient-to-r from-blue-50 via-white to-blue-50">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">

                  <Upload className="text-white" size={28} />

                </div>

                <div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Bulk Upload Consumers
                  </h2>

                  <p className="text-gray-500 mt-1 text-lg">
                    Upload Excel or CSV files to import consumer records
                  </p>

                </div>

              </div>

            </div>

            {/* BODY */}
            <div className="p-8">

              <div className="rounded-[30px] bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-inner">

                <UploadExcel />

              </div>

            </div>

          </section>

          {/* TABLE */}
          <section className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden">

            {/* HEADER */}
            <div className="px-8 py-7 bg-gradient-to-r from-gray-50 to-white">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">

                    <Users className="text-white" size={28} />

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-gray-900">
                      Consumer Records
                    </h2>

                    <p className="text-gray-500 mt-1 text-lg">
                      View and manage all registered consumers
                    </p>

                  </div>

                </div>

                {/* BUTTON */}
                <Link
                  href="/dashboard/consumers/create"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 font-medium w-fit"
                >

                  <Plus size={18} />

                  Add New Consumer

                </Link>

              </div>

            </div>

            {/* TABLE CONTENT */}
            <div className="p-6 overflow-x-auto">

              <ConsumerTable />

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}