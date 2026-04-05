import React from "react";

export function FullPageSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[50vh] p-8 space-y-6">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#312821] rounded-full animate-spin shadow-lg"></div>
      <p className="text-slate-400 animate-pulse font-bold tracking-widest uppercase text-xs">Loading Catalog...</p>
    </div>
  );
}

export function ShopDropdownSkeleton() {
  return (
    <div className="p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 w-[95vw] max-w-6xl">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2 mt-4"></div>
          <div className="h-3 bg-gray-100 rounded w-2/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}
