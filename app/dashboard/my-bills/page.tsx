"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import {
  Receipt,
  Download,
  IndianRupee,
  Zap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function MyBillsPage() {

  const [bills, setBills] =
    useState<any[]>([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills =
    async () => {

      const res = await fetch(
        "/api/consumer-portal/bills"
      );

      const data =
        await res.json();

      setBills(data);
    };

  const downloadBill =
    (id: string) => {

      window.open(
        `/api/bills/download/${id}`,
        "_blank"
      );
    };

  const totalPending =
    bills
      .filter(
        (bill) =>
          bill.status ===
          "Pending"
      )
      .reduce(
        (
          acc,
          bill
        ) =>
          acc +
          bill.totalAmount,
        0
      );

  return (
    <div className="min-h-screen flex bg-[#f5f9ff]">

      <DashboardSidebar />

      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">

              <Receipt
                className="text-white"
                size={38}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">

                My Bills

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                View and download your electricity bills

              </p>

            </div>

          </div>

          {/* SUMMARY */}
          <div className="bg-blue-50 rounded-3xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <IndianRupee
                  className="text-blue-600"
                  size={28}
                />

              </div>

              <div>

                <p className="text-blue-600 text-sm">

                  Pending Amount

                </p>

                <h2 className="text-4xl font-bold text-blue-700 mt-1">

                  ₹{totalPending}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Billing History

              </h2>

              <p className="text-gray-500 mt-1">

                Complete electricity billing records

              </p>

            </div>

            <div className="bg-[#f8fbff] px-5 py-3 rounded-2xl">

              <p className="text-sm text-gray-500">

                Total Bills

              </p>

              <h3 className="text-2xl font-bold text-blue-600 mt-1">

                {bills.length}

              </h3>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-[#f8fbff] border-b border-gray-100">

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Billing Month

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Units Consumed

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Total Amount

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Payment Status

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {bills.map(
                  (
                    bill
                  ) => (

                    <tr
                      key={
                        bill._id
                      }
                      className="border-b border-gray-100 hover:bg-[#f8fbff] transition-all duration-300"
                    >

                      {/* MONTH */}
                      <td className="p-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <Receipt
                              className="text-blue-600"
                              size={22}
                            />

                          </div>

                          <div>

                            <h3 className="font-semibold text-gray-900">

                              {
                                bill.month
                              }

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                              Electricity Bill

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* UNITS */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <Zap
                            className="text-yellow-500"
                            size={18}
                          />

                          <span className="font-semibold text-gray-900">

                            {
                              bill.unitsConsumed
                            }{" "}
                            Units

                          </span>

                        </div>

                      </td>

                      {/* AMOUNT */}
                      <td className="p-5">

                        <span className="text-2xl font-bold text-gray-900">

                          ₹
                          {
                            bill.totalAmount
                          }

                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="p-5">

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold ${
                            bill.status ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {bill.status ===
                          "Paid" ? (
                            <CheckCircle2
                              size={16}
                            />
                          ) : (
                            <AlertCircle
                              size={16}
                            />
                          )}

                          {
                            bill.status
                          }

                        </div>

                      </td>

                      {/* ACTION */}
                      <td className="p-5">

                        <button
                          onClick={() =>
                            downloadBill(
                              bill._id
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
                        >

                          <Download
                            size={18}
                          />

                          Download

                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}