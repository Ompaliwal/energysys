"use client";

import {
  useEffect,
  useState,
} from "react";

import DashboardSidebar from "../components/DashboardSidebar";

import {
  Wallet,
  IndianRupee,
  Download,
  CheckCircle2,
  CreditCard,
  CalendarDays,
  Receipt,
} from "lucide-react";

export default function MyPaymentsPage() {

  const [payments,
    setPayments] =
    useState<any[]>([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments =
    async () => {

      const res = await fetch(
        "/api/consumer-portal/payments"
      );

      const data =
        await res.json();

      setPayments(data);
    };

  const downloadReceipt =
    (id: string) => {

      window.open(
        `/api/payments/receipt/${id}`,
        "_blank"
      );
    };

  const totalPaid =
    payments.reduce(
      (
        acc,
        payment
      ) =>
        acc +
        payment.amount,
      0
    );

  return (
    <div className="min-h-screen flex bg-[#f5f9ff]">

      <DashboardSidebar />

      <main className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">

              <Wallet
                className="text-white"
                size={38}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-900">

                My Payments

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                Complete electricity payment and transaction history

              </p>

            </div>

          </div>

          {/* TOTAL */}
          <div className="bg-green-50 rounded-3xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <IndianRupee
                  className="text-green-600"
                  size={28}
                />

              </div>

              <div>

                <p className="text-green-600 text-sm">

                  Total Paid

                </p>

                <h2 className="text-4xl font-bold text-green-700 mt-1">

                  ₹{totalPaid}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* TOP */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Payment History

              </h2>

              <p className="text-gray-500 mt-1">

                Track all successful electricity bill payments

              </p>

            </div>

            <div className="bg-[#f8fbff] px-5 py-3 rounded-2xl">

              <p className="text-sm text-gray-500">

                Total Transactions

              </p>

              <h3 className="text-2xl font-bold text-green-600 mt-1">

                {payments.length}

              </h3>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-[#f8fbff] border-b border-gray-100">

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Amount

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Payment Method

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Status

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Payment Date

                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-gray-600">

                    Receipt

                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map(
                  (
                    payment
                  ) => (

                    <tr
                      key={
                        payment._id
                      }
                      className="border-b border-gray-100 hover:bg-[#f8fbff] transition-all duration-300"
                    >

                      {/* AMOUNT */}
                      <td className="p-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                            <IndianRupee
                              className="text-green-600"
                              size={22}
                            />

                          </div>

                          <div>

                            <h3 className="text-2xl font-bold text-gray-900">

                              ₹
                              {
                                payment.amount
                              }

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                              Electricity Payment

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* METHOD */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <CreditCard
                            className="text-blue-600"
                            size={18}
                          />

                          <span className="font-semibold text-gray-900">

                            {
                              payment.paymentMethod
                            }

                          </span>

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="p-5">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-100 text-green-700 text-sm font-semibold">

                          <CheckCircle2
                            size={16}
                          />

                          {
                            payment.status
                          }

                        </div>

                      </td>

                      {/* DATE */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <CalendarDays
                            className="text-orange-500"
                            size={18}
                          />

                          <span className="font-medium text-gray-700">

                            {new Date(
                              payment.paymentDate
                            ).toLocaleDateString()}

                          </span>

                        </div>

                      </td>

                      {/* RECEIPT */}
                      <td className="p-5">

                        <button
                          onClick={() =>
                            downloadReceipt(
                              payment._id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
                        >

                          <Download
                            size={18}
                          />

                          Receipt

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