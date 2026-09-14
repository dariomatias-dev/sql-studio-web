"use client";

import { useEffect, useRef } from "react";

const MIN_FILL_TIME_MS = 1500;

export const useSpamGuard = () => {
  const mountedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const isSpam = () => {
    const honeypotFilled = !!honeypotRef.current?.value;
    const filledTooFast = Date.now() - mountedAt.current < MIN_FILL_TIME_MS;
    return honeypotFilled || filledTooFast;
  };

  return { honeypotRef, isSpam };
};
