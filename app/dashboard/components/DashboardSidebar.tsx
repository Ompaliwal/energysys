"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Gauge,
  GitBranch,
  ClipboardList,
  Receipt,
  Wallet, 
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard/analytics",
    icon: LayoutDashboard,
  },

  {
    title: "Consumers",
    href: "/dashboard/consumers",
    icon: Users,
  },

  {
    title: "Meters",
    href: "/dashboard/meters",
    icon: Gauge,
  },
  {
    title: "Meter Mapping",
    href: "/dashboard/meter-mappings",
    icon: GitBranch,
  },
  {
    title: "Meter Readings",
    href: "/dashboard/meter-readings",
    icon: ClipboardList,
  },
  {
    title: "Bills",
    href: "/dashboard/bills",
    icon: Receipt,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: Wallet,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-blue-600 text-white p-6 hidden md:flex flex-col">

      <div>

        <h1 className="text-3xl font-bold mb-2">
          ⚡ EnergySys
        </h1>

        <p className="text-blue-100 text-sm mb-10">
          Smart Energy Billing Platform
        </p>

        <nav className="space-y-3">

          {links.map((link) => {
            const Icon = link.icon;

            const active =
              pathname === link.href;

            return (
              <Link
                key={link.href}
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
          })}

        </nav>

      </div>
    </aside>
  );
}