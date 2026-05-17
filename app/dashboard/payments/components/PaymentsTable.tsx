"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Download,
  Trash2,
  User,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  Wallet,
} from "lucide-react";

interface Payment {
  _id: string;

  consumerId?: {
    fullName: string;
  };

  amount: number;

  paymentMethod: string;

  status: string;
}

export default function PaymentsTable() {

  const [payments,
    setPayments] =
    useState<Payment[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH PAYMENTS
  const fetchPayments =
    async () => {

      try {

        const res = await fetch(
          "/api/payments",
          {
            cache: "no-store",
          }
        );

        const data =
          await res.json();

        if (
          Array.isArray(data)
        ) {

          setPayments(data);

        } else {

          setPayments([]);
        }

      } catch (error) {

        console.log(error);

        setPayments([]);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPayments();
  }, []);

  // DELETE
  const deletePayment =
    async (id: string) => {

      try {

        await fetch(
          `/api/payments/${id}`,
          {
            method: "DELETE",
          }
        );

        fetchPayments();

      } catch (error) {
        console.log(error);
      }
    };

  // RECEIPT
  const downloadReceipt =
    (id: string) => {

      window.open(
        `/api/payments/receipt/${id}`,
        "_blank"
      );
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Payment Records
          </h2>

          <p className="text-gray-500 mt-2">
            View all collected electricity bill payments.
          </p>

        </div>

        {/* STATS */}
        <div className="flex gap-4">

          <div className="bg-[#f8fbff] rounded-2xl px-6 py-4">

            <p className="text-sm text-gray-500">
              Total Payments
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {
                payments.length
              }
            </h3>

          </div>

          <div className="bg-green-50 rounded-2xl px-6 py-4">

            <p className="text-sm text-green-600">
              Total Amount
            </p>

            <h3 className="text-2xl font-bold text-green-700 mt-1">

              ₹
              {payments.reduce(
                (
                  total,
                  payment
                ) =>
                  total +
                  payment.amount,
                0
              )}

            </h3>

          </div>

        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20">

          <p className="text-gray-500">
            Loading payments...
          </p>

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        payments.length === 0 && (
          <div className="text-center py-20">

            <Wallet
              className="mx-auto text-gray-300 mb-4"
              size={60}
            />

            <h3 className="text-2xl font-semibold text-gray-700">
              No Payments Found
            </h3>

            <p className="text-gray-500 mt-2">
              Payment records will appear here.
            </p>

          </div>
        )}

      {/* TABLE */}
      {!loading &&
        payments.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full border-separate border-spacing-y-4">

              {/* HEADER */}
              <thead>

                <tr>

                  <th className="text-left text-gray-500 font-semibold px-6">
                    Consumer
                  </th>

                  <th className="text-left text-gray-500 font-semibold px-6">
                    Amount
                  </th>

                  <th className="text-left text-gray-500 font-semibold px-6">
                    Method
                  </th>

                  <th className="text-left text-gray-500 font-semibold px-6">
                    Status
                  </th>

                  <th className="text-left text-gray-500 font-semibold px-6">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {payments.map(
                  (payment) => (

                    <tr
                      key={
                        payment._id
                      }
                      className="bg-[#f8fbff] shadow-sm hover:shadow-md transition-all duration-300"
                    >

                      {/* CONSUMER */}
                      <td className="px-6 py-5 rounded-l-3xl">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <User
                              className="text-blue-600"
                              size={20}
                            />

                          </div>

                          <div>

                            <p className="font-semibold text-gray-900">

                              {
                                payment
                                  .consumerId
                                  ?.fullName
                              }

                            </p>

                            <p className="text-sm text-gray-500">
                              Consumer
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl">

                          <IndianRupee
                            size={16}
                          />

                          {
                            payment.amount
                          }

                        </div>

                      </td>

                      {/* METHOD */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl">

                          <CreditCard
                            size={16}
                          />

                          {
                            payment.paymentMethod
                          }

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${
                            payment.status ===
                            "Paid"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >

                          <CheckCircle2
                            size={16}
                          />

                          {
                            payment.status
                          }

                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5 rounded-r-3xl">

                        <div className="flex gap-3">

                          {/* RECEIPT */}
                          <button
                            onClick={() =>
                              downloadReceipt(
                                payment._id
                              )
                            }
                            className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 text-blue-600 px-4 py-2 rounded-2xl flex items-center gap-2"
                          >

                            <Download
                              size={16}
                            />

                            Receipt

                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              deletePayment(
                                payment._id
                              )
                            }
                            className="bg-red-50 hover:bg-red-100 transition-all duration-300 text-red-600 px-4 py-2 rounded-2xl flex items-center gap-2"
                          >

                            <Trash2
                              size={16}
                            />

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

    </div>
  );
}