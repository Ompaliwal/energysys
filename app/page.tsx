import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      
      {/* CONTENT WRAPPER */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        
        {/* TITLE */}
        <h1 className="text-5xl font-bold text-black mb-4 leading-tight">
          Energy Billing Portal
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-600 mb-10">
          Smart system for managing prepaid meters, billing, and transactions
          across multiple operational roles.
        </p>

        {/* BUTTONS (same feel as form inputs/buttons) */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          
          <Link
            href="/login"
            className="w-full px-6 py-3 border border-gray-300 rounded-lg text-black font-semibold text-center hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>

    </main>
  );
}