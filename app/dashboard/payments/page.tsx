import Link from "next/link";

import DashboardSidebar from "../components/DashboardSidebar";

import PaymentsTable from "./components/PaymentsTable";

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Payments
            </h1>

            <p className="text-gray-500 mt-2">
              Manage payment collections
            </p>

          </div>

          <Link
            href="/dashboard/payments/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Collect Payment
          </Link>

        </div>

        <PaymentsTable />

      </main>

    </div>
  );
}