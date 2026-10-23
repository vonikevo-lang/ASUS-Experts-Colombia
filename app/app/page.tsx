"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemoUser } from "@/lib/demoUser";

export default function AppEntryPage() {
  const router = useRouter();
  const { state, hydrated } = useDemoUser();

  useEffect(() => {
    if (hydrated && state.loggedIn) router.replace("/app/inicio");
  }, [hydrated, state.loggedIn, router]);

  return null;
}
