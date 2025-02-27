"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by GlobalError component:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-600">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()} // Attempts to recover by reloading the route
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
