"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  LayoutDashboard,
  Users,
  Gauge,
  GitBranch,
  ClipboardList,
  Receipt,
  Wallet,
  BarChart3,
  LogOut,
} from "lucide-react";

const allLinks = [

  // DASHBOARD
  {
    title: "Dashboard",

    href: "/dashboard",

    roles: [
      "admin",
      "manager",
    ],

    icon: LayoutDashboard,
  },

  // ADMIN + MANAGER
  {
    title: "Consumers",

    href:
      "/dashboard/consumers",

    roles: [
      "admin",
      "manager",
    ],

    icon: Users,
  },

  {
    title: "Meters",

    href:
      "/dashboard/meters",

    roles: [
      "admin",
      "manager",
    ],

    icon: Gauge,
  },

  {
    title:
      "Meter Mapping",

    href:
      "/dashboard/meter-mappings",

    roles: [
      "admin",
      "manager",
    ],

    icon: GitBranch,
  },

  {
    title: "Bills",

    href:
      "/dashboard/bills",

    roles: [
      "admin",
      "manager",
    ],

    icon: Receipt,
  },

  {
    title: "Analytics",

    href:
      "/dashboard/analytics",

    roles: [
      "admin",
      "manager",
    ],

    icon: BarChart3,
  },

  // READER
  {
    title:
      "Meter Readings",

    href:
      "/dashboard/meter-readings",

    roles: [
      "admin",
      "reader",
    ],

    icon:
      ClipboardList,
  },

  // CASHIER
  {
    title: "Payments",

    href:
      "/dashboard/payments",

    roles: [
      "admin",
      "cashier",
    ],

    icon: Wallet,
  },

  // CONSUMER PORTAL
  {
    title: "My Meter",

    href:
      "/dashboard/my-meter",

    roles: [
      "consumer",
    ],

    icon: Gauge,
  },

  {
    title:
      "My Readings",

    href:
      "/dashboard/my-readings",

    roles: [
      "consumer",
    ],

    icon:
      ClipboardList,
  },

  {
    title: "My Bills",

    href:
      "/dashboard/my-bills",

    roles: [
      "consumer",
    ],

    icon: Receipt,
  },

  {
    title:
      "My Payments",

    href:
      "/dashboard/my-payments",

    roles: [
      "consumer",
    ],

    icon: Wallet,
  },
];

export default function DashboardSidebar() {

  const pathname =
    usePathname();

  const { data: session } =
    useSession();

  const role =
    session?.user?.role;

  const filteredLinks =
    allLinks.filter(
      (link) =>
        link.roles.includes(
          role as string
        )
    );

  return (
    <aside className="w-72 min-h-screen bg-blue-600 text-white p-6 hidden md:flex flex-col justify-between">

      {/* TOP SECTION */}

      <div>

        {/* LOGO */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold">
            ⚡ EnergySys
          </h1>

          <p className="text-blue-100 text-sm mt-2">
            Smart Energy ERP
          </p>

        </div>

        {/* USER INFO */}

        <div className="bg-white/10 rounded-2xl p-4 mb-8">

          <p className="text-sm text-blue-100">
            Logged in as
          </p>

          <h2 className="text-lg font-semibold mt-1">

            {
              session?.user?.name
            }

          </h2>

          <span className="inline-block mt-3 bg-white/20 text-sm px-4 py-1 rounded-xl capitalize">

            {role}

          </span>

        </div>

        {/* NAVIGATION */}

        <nav className="space-y-3">

          {filteredLinks.map(
            (link) => {

              const Icon =
                link.icon;

              const active =
                pathname.startsWith(
                  link.href
                );

              return (
                <Link
                  key={`${link.title}-${link.href}`}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >

                  <Icon size={20} />

                  {link.title}

                </Link>
              );
            }
          )}

        </nav>

      </div>

      {/* LOGOUT */}

      <button
        onClick={() =>
          signOut({
            callbackUrl:
              "/login",
          })
        }
        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-xl"
      >

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}