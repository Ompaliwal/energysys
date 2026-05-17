"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "reader",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/select-role",
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white">
        <div className="w-full h-full flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold mb-6">
            ⚡ Create Account
          </h1>
          <p className="text-lg max-w-md">
            Join the smart energy management system.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-col justify-center px-16 max-w-2xl">

          <h2 className="text-3xl font-bold mb-6 text-black">
            Register
          </h2>

          {error && <p className="text-red-600 mb-3">{error}</p>}
          {success && <p className="text-green-600 mb-3">{success}</p>}

          {/* Name */}
          <input
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Role */}
          <select
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="reader">Meter Reader</option>
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="consumer">Consumer</option>

          </select>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-medium text-black hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            {googleLoading ? "Redirecting..." : "Sign up with Google"}
          </button>

          <p className="mt-4 text-black">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}