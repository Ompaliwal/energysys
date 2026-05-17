import DashboardSidebar from "../../components/DashboardSidebar";

import MeterReadingForm from "../components/MeterReadingForm";

export default function CreateMeterReadingPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Add Meter Reading
          </h1>

          <p className="text-gray-500 mt-2">
            Create monthly meter reading
          </p>

        </div>

        <MeterReadingForm />

      </main>
    </div>
  );
}