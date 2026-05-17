import DashboardSidebar from "../../components/DashboardSidebar";

import BillGenerateForm from "../components/BillGenerateForm";

export default function GenerateBillsPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <BillGenerateForm />

      </main>

    </div>
  );
}