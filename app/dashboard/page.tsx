"use client";

import {
  useEffect,
} from "react";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  useRouter,
} from "next/navigation";

import DashboardSidebar from "./components/DashboardSidebar";

import {
  Users,
  CreditCard,
  Activity,
  Gauge,
  LogOut,
  Wallet,
  ClipboardList,
  Receipt,
} from "lucide-react";

export default function Dashboard() {

  const {
    data: session,
    status,
  } = useSession();

  const router =
    useRouter();

  useEffect(() => {

    if (
      status === "loading"
    )
      return;

    if (
      status ===
      "unauthenticated"
    ) {

      router.push(
        "/login"
      );

      return;
    }

    if (
      !session?.user?.role
    ) {

      router.push(
        "/select-role"
      );
    }

  }, [
    status,
    session,
    router,
  ]);

  // ROLE
  const role =
    session?.user?.role;

  // ROLE BASED CARDS
  const cardsByRole: any = {

    admin: [
      {
        title:
          "Consumers",

        desc:
          "Manage all electricity consumers",

        icon: Users,
      },

      {
        title:
          "Billing",

        desc:
          "Generate electricity bills",

        icon:
          CreditCard,
      },

      {
        title:
          "Transactions",

        desc:
          "Track payments and history",

        icon:
          Activity,
      },

      {
        title:
          "Meters",

        desc:
          "Monitor smart meter readings",

        icon: Gauge,
      },
    ],

    manager: [
      {
        title:
          "Consumers",

        desc:
          "Manage all consumers",

        icon: Users,
      },

      {
        title:
          "Bills",

        desc:
          "Manage electricity billing",

        icon:
          CreditCard,
      },

      {
        title:
          "Analytics",

        desc:
          "Track business analytics",

        icon:
          Activity,
      },
    ],

    cashier: [
      {
        title:
          "Payments",

        desc:
          "Manage bill payments",

        icon:
          Wallet,
      },

      {
        title:
          "Transactions",

        desc:
          "Track payment history",

        icon:
          Activity,
      },
    ],

    reader: [
      {
        title:
          "Meter Readings",

        desc:
          "Manage meter readings",

        icon:
          ClipboardList,
      },

      {
        title:
          "Meters",

        desc:
          "Track smart meters",

        icon: Gauge,
      },
    ],

    consumer: [
      {
        title:
          "My Bills",

        desc:
          "View your electricity bills",

        icon:
          Receipt,
      },

      {
        title:
          "My Payments",

        desc:
          "Track your bill payments",

        icon:
          Wallet,
      },

      {
        title:
          "My Meter",

        desc:
          "View your meter details",

        icon: Gauge,
      },

      {
        title:
          "My Readings",

        desc:
          "Check your electricity usage",

        icon:
          ClipboardList,
      },
    ],
  };

  const cards =
    cardsByRole[
      role as keyof typeof cardsByRole
    ] || [];

  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      {/* SIDEBAR */}

      <DashboardSidebar />

      {/* MAIN */}

      <main className="flex-1 p-6">

        {/* TOP BAR */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-gray-900">

              Welcome back,

              <span className="text-blue-600">
                {" "}
                {
                  session?.user
                    ?.name
                }
              </span>

            </h2>

            <p className="text-gray-500 mt-1 capitalize">

              Logged in as{" "}

              <span className="font-semibold text-blue-600">
                {role}
              </span>

            </p>

          </div>

          {/* LOGOUT */}

          <button
            onClick={() =>
              signOut({
                callbackUrl:
                  "/login",
              })
            }
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >

            <LogOut
              size={18}
            />

            Logout

          </button>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {cards.map(
            (
              card: any,
              i: number
            ) => {

              const Icon =
                card.icon;

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
                >

                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">

                    <Icon
                      className="text-blue-600"
                      size={26}
                    />

                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">

                    {
                      card.title
                    }

                  </h3>

                  <p className="text-gray-500 text-sm mt-2">

                    {
                      card.desc
                    }

                  </p>

                </div>
              );
            }
          )}

        </div>

      </main>

    </div>
  );
}