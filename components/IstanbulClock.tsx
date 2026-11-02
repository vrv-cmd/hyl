"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

// One shared ticker that fires right on each second boundary.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
  listeners.forEach((l) => l());
  timer = setTimeout(tick, 1000 - (Date.now() % 1000));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) timer = setTimeout(tick, 1000 - (Date.now() % 1000));
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

// Snapshot is the current whole second, so React only re-renders once per tick.
const getSnapshot = () => Math.floor(Date.now() / 1000);
// Nothing time-based is rendered on the server: the page stays fully static.
const getServerSnapshot = () => null;

function useSecond() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const dateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const isoDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: site.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** "monday 02 november year 2026" (shown uppercase via CSS) */
function formatDate(date: Date) {
  const p = Object.fromEntries(dateParts.formatToParts(date).map((x) => [x.type, x.value]));
  return `${p.weekday} ${p.day} ${p.month} year ${p.year}`;
}

export function IstanbulDate({ className }: { className?: string }) {
  const second = useSecond();
  if (second === null) {
    return <span className={className} aria-hidden="true">&nbsp;</span>;
  }
  const now = new Date(second * 1000);
  return (
    <time className={className} dateTime={isoDate.format(now)}>
      {formatDate(now)}
    </time>
  );
}

export function IstanbulTime({ className }: { className?: string }) {
  const second = useSecond();
  if (second === null) {
    // Reserve the width so the layout doesn't shift when the clock mounts.
    return (
      <span className={className} aria-hidden="true" style={{ visibility: "hidden" }}>
        00:00:00
      </span>
    );
  }
  const now = new Date(second * 1000);
  const time = timeFormat.format(now);
  return (
    <time className={className} dateTime={time} title="Istanbul time (TRT, UTC+3)">
      {time}
    </time>
  );
}
