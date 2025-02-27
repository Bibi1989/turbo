import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="container mx-auto ">
      <Skeleton className="h-[200px] w-full mt-4" />
    </div>
  );
};

export default loading;
