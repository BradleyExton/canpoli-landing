"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function buildParams(dataset: DOMStringMap) {
  const params: Record<string, string> = {};

  Object.entries(dataset).forEach(([key, value]) => {
    if (key === "trackEvent" || value === undefined) return;

    const normalizedKey = key.startsWith("track")
      ? key.slice(5).replace(/^./, (char) => char.toLowerCase())
      : key;

    if (normalizedKey) {
      params[normalizedKey] = value;
    }
  });

  return Object.keys(params).length ? params : undefined;
}

export function AnalyticsListener() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-track-event]");
      if (!tracked) return;

      const name = tracked.dataset.trackEvent;
      if (!name) return;

      const params = buildParams(tracked.dataset);
      trackEvent(name, params);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
