import Link from "next/link";

import DashboardSidebar from "../components/DashboardSidebar";

import MeterReadingTable from "./components/MeterReadingTable";

export default function MeterReadingsPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Meter Readings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all meter readings
            </p>

          </div>

          <Link
            href="/dashboard/meter-readings/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            + Add Reading
          </Link>

        </div>

        <MeterReadingTable />

      </main>

    </div>
  );
}