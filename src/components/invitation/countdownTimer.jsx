"use client";

import { useState, useEffect } from "react";
import { diffParts } from "@/utils/formatters";
import { Countdown } from "@/components/invitation/countdown";
import { HStack } from "@chakra-ui/react";

export function CountdownTimer({ eventDate, isMobile }) {
  const [countdown, setCountdown] = useState(() => diffParts(eventDate));

  useEffect(() => {
    const interval = setInterval(() => setCountdown(diffParts(eventDate)), 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <HStack gap={isMobile ? "16px" : "48px"}>
      <Countdown value={countdown.days}                            label="days"  isMobile={isMobile} />
      <Countdown value={String(countdown.hours).padStart(2, "0")} label="hours" isMobile={isMobile} />
      <Countdown value={String(countdown.min).padStart(2, "0")}   label="min"   isMobile={isMobile} />
      <Countdown value={String(countdown.sec).padStart(2, "0")}   label="sec"   isMobile={isMobile} />
    </HStack>
  );
}