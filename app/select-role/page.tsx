"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Briefcase,
  Wallet,
  Gauge,
} from "lucide-react";

export default function SelectRole() {
  const { data: session, status, update } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    // if role already exists skip
    if (session?.user?.role) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const selectRole = async (
    role: "admin" | "manager" | "cashier" | "reader"
  ) => {
    try {
      setLoading(true);

      if (!session?.user?.email) return;

      const res = await fetch("/api/user/role", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: session.user.email,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update role");
        return;
      }

      // refresh session
      await update();

      router.push("/dashboard");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      key: "admin",
      title: "Admin",
      desc: "Full system access & control",
      icon: ShieldCheck,
      color: "bg-blue-100 text-blue-600",
    },

    {
      key: "manager",
      title: "Manager",
      desc: "Manage users, billing & reports",
      icon: Briefcase,
      color: "bg-indigo-100 text-indigo-600",
    },

    {
      key: "cashier",
      title: "Cashier",
      desc: "Handle payments & transactions",
      icon: Wallet,
      color: "bg-green-100 text-green-600",
    },

    {
      key: "reader",
      title: "Meter Reader",
      desc: "Record and update meter readings",
      icon: Gauge,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex bg-blue-600 items-center justify-center p-10 text-white relative overflow-hidden">

        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-80 h-80 bg-white/10 rounded-full bottom-0 right-0"></div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            ⚡ Energy Billing Portal
          </h1>

          <p className="text-lg text-blue-100 leading-relaxed">
            Assign your system role to continue accessing
            the smart energy management platform securely.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <h3 className="font-semibold text-lg">
                Secure Role Access
              </h3>

              <p className="text-sm text-blue-100 mt-1">
                Every user gets controlled permissions
                based on their assigned role.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <h3 className="font-semibold text-lg">
                Smart Utility Management
              </h3>

              <p className="text-sm text-blue-100 mt-1">
                Manage consumers, billing, transactions
                and meter readings efficiently.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12">

        <div className="w-full max-w-2xl">

          {/* HEADER */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white text-3xl shadow-lg mb-5">
              ⚡
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              Choose Your Role
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Select your access level to continue
            </p>
          </div>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <button
                  key={role.key}
                  disabled={loading}
                  onClick={() =>
                    selectRole(
                      role.key as
                        | "admin"
                        | "manager"
                        | "cashier"
                        | "reader"
                    )
                  }
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300"
                >

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${role.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {role.title}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    {role.desc}
                  </p>

                  <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                    Continue →
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
                </button>
              );
            })}

          </div>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-10">
            Energy Billing System • Secure Role Assignment
          </p>

        </div>
      </div>
    </div>
  );
}