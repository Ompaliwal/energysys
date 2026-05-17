"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import StatsCards from "./components/StatsCards";

import RevenueChart from "./components/RevenueChart";

import ConsumptionChart from "./components/ConsumptionChart";

import PaymentMethodChart from "./components/PaymentMethodChart";

import RecentActivities from "./components/RecentActivities";

export default function AnalyticsPage() {

  const [stats, setStats] =
    useState<any>({});

  const [revenue, setRevenue] =
    useState<any[]>([]);

  const [
    consumption,
    setConsumption,
  ] = useState<any[]>([]);

  const [payments, setPayments] =
    useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {

      const statsRes =
        await fetch(
          "/api/analytics/dashboard"
        );

      const revenueRes =
        await fetch(
          "/api/analytics/revenue"
        );

      const consumptionRes =
        await fetch(
          "/api/analytics/consumption"
        );

      const paymentsRes =
        await fetch(
          "/api/analytics/payments"
        );

      setStats(
        await statsRes.json()
      );

      setRevenue(
        await revenueRes.json()
      );

      setConsumption(
        await consumptionRes.json()
      );

      setPayments(
        await paymentsRes.json()
      );
    };

  return (
    <div className="min-h-screen bg-[#f5f9ff] flex">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Utility business insights
          </p>

        </div>

        {/* STATS */}

        <StatsCards
          stats={stats}
        />

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <RevenueChart
            data={revenue}
          />

          <ConsumptionChart
            data={consumption}
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <PaymentMethodChart
            data={payments}
          />

          <RecentActivities />

        </div>

      </main>

    </div>
  );
}