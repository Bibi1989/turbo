"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth.service";

const Login = () => {
  // const [error, setError] = useState("");
  const router = useRouter();

  const [state, action, pending] = useActionState(login, undefined);

  console.log(state);

  useEffect(() => {
    if (state?.data?.accessToken) {
      localStorage.setItem("token", state?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(state?.data));
      router.push("/");
      console.log(state);
      // localStorage.setItem("token", state?.data?.accessToken);
      // localStorage.setItem("user", JSON.stringify(state?.data));
    }
  }, [router, state]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {state?.status === "error" && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {state?.message}
          </p>
        )}

        <form action={action} className="mt-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
            {state?.errors?.email && (
              <p className="mt-2 text-sm text-red-500">Invalid email</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
            {state?.errors?.password && (
              <p className="mt-2 text-sm text-red-500">Invalid password</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {pending ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Dont have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
