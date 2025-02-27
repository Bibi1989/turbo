"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define validation schema with Zod
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: unknown) => {
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Username</label>
            <input
              {...register("username")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              {...register("phone")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
