"use client";

import { useLayoutEffect } from "react";

export function SetAdminTitle({ title }: { title: string }) {
  useLayoutEffect(() => {
    const el = document.getElementById("admin-page-title");
    if (!el) return;

    el.textContent = title;

    return () => {
      el.textContent = "";
    };
  }, [title]);

  return null;
}
