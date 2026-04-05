// hooks/useFilter.ts
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export const useFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateFilters = (data: Record<string, any>) => {
    try {
      const newParams = new URLSearchParams(params.toString());

      Object.entries(data).forEach(([key, value]) => {
        if (!value || value === "" || value==undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${newParams.toString()}`);
      });
    } catch (e) {
      console.error("Filter crash prevented", e);
    }
  };

  const reset = () => {
    router.push(pathname);
  };

  return { updateFilters, reset, isPending };
};