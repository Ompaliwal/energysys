import ConsumerForm from "../components/ConsumerForm";

import DashboardSidebar from "../../components/DashboardSidebar";

export default function CreateConsumerPage() {
  return (
    <div className="min-h-screen bg-[#f6f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-gray-900">
            Add Consumer
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Create and register a new electricity consumer
          </p>

        </div>

        <ConsumerForm />

      </main>

    </div>
  );
}