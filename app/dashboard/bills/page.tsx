import Link from "next/link";

import DashboardSidebar from "../components/DashboardSidebar";

import BillsTable from "./components/BillsTable";

export default function BillsPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Bills
            </h1>

            <p className="text-gray-500 mt-2">
              Manage generated bills
            </p>

          </div>

          <Link
            href="/dashboard/bills/generate"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Generate Bills
          </Link>

        </div>

        <BillsTable />

      </main>

    </div>
  );
}