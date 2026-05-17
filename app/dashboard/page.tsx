"use client";

import { useSession, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import DashboardSidebar from "./components/DashboardSidebar";

import {
  Users,
  CreditCard,
  Activity,
  Gauge,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const { data: session, status } =
    useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (!session?.user?.role) {
      router.push("/select-role");
    }

  }, [status, session, router]);

  const cards = [
    {
      title: "Consumers",
      desc: "Manage all electricity consumers",
      icon: Users,
    },

    {
      title: "Billing",
      desc: "Generate electricity bills",
      icon: CreditCard,
    },

    {
      title: "Transactions",
      desc: "Track payments and history",
      icon: Activity,
    },

    {
      title: "Meters",
      desc: "Monitor smart meter readings",
      icon: Gauge,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">

              Welcome back,

              <span className="text-blue-600">
                {" "}
                {session?.user?.name}
              </span>

            </h2>

            <p className="text-gray-500 mt-1">
              Manage your smart energy system efficiently.
            </p>
          </div>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="bg-red-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">

                  <Icon
                    className="text-blue-600"
                    size={26}
                  />

                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {card.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {card.desc}
                </p>

              </div>
            );
          })}

        </div>

      </main>
    </div>
  );
}