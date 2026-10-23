import { Suspense } from "react";
import type { Metadata } from "next";
import { ComparadorClient } from "./ComparadorClient";

export const metadata: Metadata = {
  title: "Comparador",
};

export default function ComparadorPage() {
  return (
    <Suspense fallback={null}>
      <ComparadorClient />
    </Suspense>
  );
}
