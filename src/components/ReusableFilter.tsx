"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export const useFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const updateFilters = (data: Record<string, any>) => {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === null || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    // নতুন ফিল্টার দিলে পেজ ১ থেকে শুরু হবে
    newParams.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  };

  const reset = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return { updateFilters, reset, isPending };
};