"use client";

import { useState } from "react";

export default function UploadExcel() {
  const [file, setFile] =
    useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    await fetch("/api/consumers/upload", {
      method: "POST",
      body: formData,
    });

    alert("Consumers uploaded");

    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border mt-6">

      <h2 className="text-xl font-bold mb-4">
        Upload Excel / CSV
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

      <button
        onClick={uploadFile}
        className="bg-green-600 text-white px-5 py-2 rounded-xl ml-4"
      >
        Upload
      </button>
    </div>
  );
}