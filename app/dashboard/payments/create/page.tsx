import DashboardSidebar from "../../components/DashboardSidebar";

import PaymentForm from "../components/PaymentForm";

export default function CreatePaymentPage() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Collect Payment
          </h1>

          <p className="text-gray-500 mt-2">
            Receive bill payments
          </p>

        </div>

        <PaymentForm />

      </main>

    </div>
  );
}