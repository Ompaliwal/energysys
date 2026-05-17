"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  User,
  Cpu,
  FileText,
  Link2,
  Zap,
} from "lucide-react";

export default function MeterMappingForm() {
  const [loading, setLoading] =
    useState(false);

  const [consumers, setConsumers] =
    useState([]);

  const [meters, setMeters] =
    useState([]);

  const [form, setForm] = useState({
    consumerId: "",
    meterId: "",
    remarks: "",
  });

  useEffect(() => {
    fetchConsumers();

    fetchMeters();
  }, []);

  const fetchConsumers =
    async () => {
      try {
        const res = await fetch(
          "/api/consumers"
        );

        const data =
          await res.json();

        setConsumers(data);

      } catch (error) {
        console.log(error);
      }
    };

  const fetchMeters =
    async () => {
      try {
        const res = await fetch(
          "/api/meters"
        );

        const data =
          await res.json();

        setMeters(data);

      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/meter-mappings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(form),
          }
        );

        if (!res.ok) {
          alert(
            "Failed to create mapping"
          );

          return;
        }

        alert(
          "Meter mapping created successfully"
        );

        window.location.href =
          "/dashboard/meter-mappings";

      } catch (error) {
        console.log(error);

        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl">

          <Link2
            className="text-white"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            Create Meter Mapping
          </h2>

          <p className="text-gray-500 mt-1">
            Link electricity consumers with smart meters
          </p>

        </div>

      </div>

      {/* FORM */}
      <div className="space-y-6">

        {/* CONSUMER */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Select Consumer
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <User
              size={18}
              className="text-blue-600"
            />

            <select
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  consumerId:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Consumer
              </option>

              {consumers.map(
                (consumer: any) => (
                  <option
                    key={
                      consumer._id
                    }
                    value={
                      consumer._id
                    }
                  >
                    {
                      consumer.fullName
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* METER */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Select Meter
          </label>

          <div className="flex items-center bg-[#f8fbff] rounded-2xl px-4 shadow-sm">

            <Cpu
              size={18}
              className="text-blue-600"
            />

            <select
              className="w-full bg-transparent px-3 py-4 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  meterId:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Meter
              </option>

              {meters.map(
                (meter: any) => (
                  <option
                    key={meter._id}
                    value={
                      meter._id
                    }
                  >
                    {
                      meter.meterNumber
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* REMARKS */}
        <div>

          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Remarks
          </label>

          <div className="flex items-start bg-[#f8fbff] rounded-2xl px-4 py-4 shadow-sm">

            <FileText
              size={18}
              className="text-blue-600 mt-1"
            />

            <textarea
              placeholder="Enter remarks"
              className="w-full bg-transparent px-3 outline-none resize-none h-28"
              onChange={(e) =>
                setForm({
                  ...form,
                  remarks:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold flex items-center gap-3"
      >

        <Zap size={20} />

        {loading
          ? "Creating Mapping..."
          : "Create Mapping"}

      </button>

    </div>
  );
}