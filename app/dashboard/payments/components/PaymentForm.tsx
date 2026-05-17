"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  CreditCard,
  IndianRupee,
  Wallet,
  Receipt,
  User,
  CheckCircle2,
} from "lucide-react";

interface Bill {
  _id: string;

  month: string;

  totalAmount: number;

  consumerId?: {
    _id: string;
    fullName: string;
  };

  status: string;
}

export default function PaymentForm() {

  const [loading, setLoading] =
    useState(false);

  const [bills, setBills] =
    useState<Bill[]>([]);

  const [form, setForm] =
    useState({
      consumerId: "",
      billId: "",
      amount: 0,
      paymentMethod: "Cash",
      transactionId: "",
    });

  useEffect(() => {
    fetchBills();
  }, []);

  // FETCH BILLS
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

        if (
          Array.isArray(data)
        ) {

          setBills(
            data.filter(
              (
                bill: Bill
              ) =>
                bill.status ===
                "Pending"
            )
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  // BILL SELECT
  const handleBillSelect =
    (billId: string) => {

      const selected =
        bills.find(
          (bill) =>
            bill._id ===
            billId
        );

      if (!selected) return;

      setForm({
        ...form,

        billId:
          selected._id,

        consumerId:
          selected
            .consumerId
            ?._id || "",

        amount:
          selected.totalAmount,
      });
    };

  // SUBMIT
  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await fetch(
          "/api/payments",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              form
            ),
          }
        );

        alert(
          "Payment collected successfully"
        );

        window.location.href =
          "/dashboard/payments";

      } catch (error) {

        console.log(error);

        alert(
          "Payment failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl">

            <Wallet
              className="text-white"
              size={30}
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              Collect Payment
            </h2>

            <p className="text-gray-500 mt-1">
              Collect electricity bill payments securely.
            </p>

          </div>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BILL SELECT */}
          <div className="md:col-span-2">

            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Select Pending Bill
            </label>

            <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

              <Receipt
                size={18}
                className="text-blue-600"
              />

              <select
                className="w-full bg-transparent px-3 py-4 outline-none"
                onChange={(e) =>
                  handleBillSelect(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Pending Bill
                </option>

                {bills.map(
                  (bill) => (

                    <option
                      key={
                        bill._id
                      }
                      value={
                        bill._id
                      }
                    >

                      {
                        bill
                          .consumerId
                          ?.fullName
                      }

                      {" - "}

                      {
                        bill.month
                      }

                      {" - ₹"}

                      {
                        bill.totalAmount
                      }

                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* AMOUNT */}
          <div>

            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Bill Amount
            </label>

            <div className="flex items-center bg-green-50 rounded-2xl px-4 shadow-sm">

              <IndianRupee
                size={18}
                className="text-green-600"
              />

              <input
                type="number"
                value={
                  form.amount
                }
                disabled
                className="w-full bg-transparent px-3 py-4 outline-none text-green-700 font-semibold"
              />

            </div>

          </div>

          {/* PAYMENT METHOD */}
          <div>

            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Payment Method
            </label>

            <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

              <CreditCard
                size={18}
                className="text-blue-600"
              />

              <select
                className="w-full bg-transparent px-3 py-4 outline-none"
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentMethod:
                      e.target
                        .value,
                  })
                }
              >

                <option>
                  Cash
                </option>

                <option>
                  UPI
                </option>

                <option>
                  Card
                </option>

                <option>
                  Bank Transfer
                </option>

              </select>

            </div>

          </div>

          {/* TRANSACTION ID */}
          <div className="md:col-span-2">

            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Transaction ID
            </label>

            <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

              <User
                size={18}
                className="text-blue-600"
              />

              <input
                placeholder="Enter transaction ID"
                className="w-full bg-transparent px-3 py-4 outline-none"
                onChange={(e) =>
                  setForm({
                    ...form,
                    transactionId:
                      e.target
                        .value,
                  })
                }
              />

            </div>

          </div>

        </div>

        {/* PAYMENT SUMMARY */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white">

          <div className="flex items-center gap-3 mb-4">

            <CheckCircle2
              size={22}
            />

            <h3 className="text-xl font-semibold">
              Payment Summary
            </h3>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>

              <p className="text-blue-100 text-sm">
                Amount
              </p>

              <h4 className="text-2xl font-bold mt-1">
                ₹
                {
                  form.amount
                }
              </h4>

            </div>

            <div>

              <p className="text-blue-100 text-sm">
                Method
              </p>

              <h4 className="text-2xl font-bold mt-1">
                {
                  form.paymentMethod
                }
              </h4>

            </div>

            <div>

              <p className="text-blue-100 text-sm">
                Status
              </p>

              <h4 className="text-2xl font-bold mt-1">
                Pending
              </h4>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold"
        >

          {loading
            ? "Processing Payment..."
            : "Collect Payment"}

        </button>

      </div>

    </div>
  );
}