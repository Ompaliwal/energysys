import DashboardSidebar from "../../components/DashboardSidebar";

import MeterForm from "../components/MeterForm";

export default function CreateMeterPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Add Meter
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new electricity meter
          </p>

        </div>

        <MeterForm />

      </main>
    </div>
  );
}