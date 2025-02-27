// "use client";

// import * as z from "zod";

import { Search } from "lucide-react";
import React from "react";

// const schema = z.object({
//   username: z.string().min(2, "Username must be at least 2 characters"),
// });

// type Inputs = z.infer<typeof schema>;

const SearchContainer = async () => {
  return (
    <div className="min-h-[200px] bg-violet-500 flex flex-col items-center px-20 py-10">
      <h1 className="text-white md:text-3xl text-sm text-center font-bold mb-4">
        Search for an event to attend
      </h1>
      <form
        action=""
        className="w-2/3 mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-between"
      >
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full outline-none text-white"
        />
        <Search className="text-white" />
      </form>
    </div>
  );
};

export default SearchContainer;
