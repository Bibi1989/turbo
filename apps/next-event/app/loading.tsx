import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto ">
      <Skeleton className="h-[200px] w-full mt-4" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[350px] rounded-xs" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
