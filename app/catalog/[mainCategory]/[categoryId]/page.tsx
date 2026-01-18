"use client";

import { Suspense } from "react";
import Catalog from "@/components/ui/Catalog";

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-10">Loading catalog...</div>}>
      <Catalog />
    </Suspense>
  );
}