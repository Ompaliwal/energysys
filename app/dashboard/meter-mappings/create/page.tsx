import DashboardSidebar from "../../components/DashboardSidebar";

import MeterMappingForm from "../components/MeterMappingForm";

export default function CreateMeterMappingPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Create Meter Mapping
          </h1>

          <p className="text-gray-500 mt-2">
            Assign meter to consumer
          </p>

        </div>

        <MeterMappingForm />

      </main>
    </div>
  );
}