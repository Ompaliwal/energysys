"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Trash2,
  Download,
  FileText,
  User,
  Cpu,
  Zap,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

interface Bill {
  _id: string;

  consumerId?: {
    fullName: string;
  };

  meterId?: {
    meterNumber: string;
  };

  month: string;

  unitsConsumed: number;

  totalAmount: number;

  status: string;
}

export default function BillsTable() {

  const [bills, setBills] =
    useState<Bill[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBills =
    async () => {

      try {

        const res = await fetch(
          "/api/bills",
          {
            cache: "no-store",
          }
        );

        const data =
          await res.json();

        console.log(
          "Bills Data:",
          data
        );

        // ✅ VERY IMPORTANT FIX
        if (Array.isArray(data)) {

          setBills(data);

        } else {

          setBills([]);
        }

      } catch (error) {

        console.log(error);

        setBills([]);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBills();
  }, []);

  const deleteBill =
    async (id: string) => {

      try {

        await fetch(
          `/api/bills/${id}`,
          {
            method: "DELETE",
          }
        );

        fetchBills();

      } catch (error) {
        console.log(error);
      }
    };

  const downloadBill =
    (id: string) => {

      window.open(
        `/api/bills/download/${id}`,
        "_blank"
      );
    };

  const downloadAllBills =
    () => {

      window.open(
        "/api/bills/download-all",
        "_blank"
      );
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Generated Bills
          </h2>

          <p className="text-gray-500 mt-2">
            View and manage generated electricity bills
          </p>

        </div>

        <button
          onClick={downloadAllBills}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-2xl flex items-center gap-3"
        >

          <Download size={18} />

          Download All

        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20">

          <p className="text-gray-500">
            Loading bills...
          </p>

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        bills.length === 0 && (
          <div className="text-center py-20">

            <FileText
              className="mx-auto text-gray-300 mb-4"
              size={60}
            />

            <h3 className="text-2xl font-semibold text-gray-700">
              No Bills Found
            </h3>

          </div>
        )}

      {/* TABLE */}
      {!loading &&
        bills.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full border-separate border-spacing-y-4">

              <thead>

                <tr>

                  <th className="text-left px-6 text-gray-500">
                    Consumer
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Meter
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Month
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Units
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Amount
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Status
                  </th>

                  <th className="text-left px-6 text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {bills.map(
                  (bill) => (

                    <tr
                      key={bill._id}
                      className="bg-[#f8fbff] shadow-sm"
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
                                bill
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

                      {/* METER */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl">

                          <Cpu
                            size={16}
                          />

                          {
                            bill
                              .meterId
                              ?.meterNumber
                          }

                        </div>

                      </td>

                      {/* MONTH */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={16}
                            className="text-blue-600"
                          />

                          {bill.month}

                        </div>

                      </td>

                      {/* UNITS */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-2xl">

                          <Zap
                            size={16}
                          />

                          {
                            bill.unitsConsumed
                          }

                        </div>

                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-5">

                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl">

                          <IndianRupee
                            size={16}
                          />

                          {
                            bill.totalAmount
                          }

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-2xl inline-flex">

                          {bill.status}

                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5 rounded-r-3xl">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              downloadBill(
                                bill._id
                              )
                            }
                            className="bg-blue-50 hover:bg-blue-100 transition text-blue-600 px-4 py-2 rounded-2xl flex items-center gap-2"
                          >

                            <Download
                              size={16}
                            />

                            Download

                          </button>

                          <button
                            onClick={() =>
                              deleteBill(
                                bill._id
                              )
                            }
                            className="bg-red-50 hover:bg-red-100 transition text-red-600 px-4 py-2 rounded-2xl flex items-center gap-2"
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