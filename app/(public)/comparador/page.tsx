import { Suspense } from "react";
import type { Metadata } from "next";
import { ComparadorClient } from "./ComparadorClient";

export const metadata: Metadata = {
  title: "Comparador | ASUS Experts Colombia",
};

export default function ComparadorPage() {
  return (
    <Suspense fallback={null}>
      <ComparadorClient />
    </Suspense>
  );
}
