"use client";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function FormSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User created successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign up</h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full transition"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
