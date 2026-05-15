"use client";

import { useState, useEffect } from "react";
import { diffParts } from "@/utils/formatters";
import { Countdown } from "@/components/invitation/countdown";
import { HStack, Separator } from "@chakra-ui/react";

export function CountdownTimer({ template, eventDate, isMobile }) {
  const [countdown, setCountdown] = useState(() => diffParts(eventDate));

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(diffParts(eventDate)),
      1000,
    );
    return () => clearInterval(interval);
  }, [eventDate]);

  if (template === "template.modern.romance") {
    return (
      <HStack gap={isMobile ? "16px" : "32px"}>
        <Countdown
          template={template}
          value={countdown.days}
          label="days"
          isMobile={isMobile}
        />
        <Separator orientation="vertical" h="30px" />
        <Countdown
          template={template}
          value={String(countdown.hours).padStart(2, "0")}
          label="hours"
          isMobile={isMobile}
        />
        <Separator orientation="vertical" h="30px" />
        <Countdown
          template={template}
          value={String(countdown.min).padStart(2, "0")}
          label="min"
          isMobile={isMobile}
        />
        <Separator orientation="vertical" h="30px" />
        <Countdown
          template={template}
          value={String(countdown.sec).padStart(2, "0")}
          label="sec"
          isMobile={isMobile}
        />
      </HStack>
    );
  }

  if (template === "template.classic.elegance") {
    return (
      <HStack gap={isMobile ? "16px" : "48px"}>
        <Countdown
          template={template}
          value={countdown.days}
          label="days"
          isMobile={isMobile}
        />
        <Countdown
          template={template}
          value={String(countdown.hours).padStart(2, "0")}
          label="hours"
          isMobile={isMobile}
        />
        <Countdown
          template={template}
          value={String(countdown.min).padStart(2, "0")}
          label="min"
          isMobile={isMobile}
        />
        <Countdown
          template={template}
          value={String(countdown.sec).padStart(2, "0")}
          label="sec"
          isMobile={isMobile}
        />
      </HStack>
    );
  }

  return (
    <HStack gap={isMobile ? "16px" : "40px"}>
      <Countdown
        template={template}
        value={countdown.days}
        label="days"
        isMobile={isMobile}
      />
      <Countdown
        template={template}
        value={String(countdown.hours).padStart(2, "0")}
        label="hours"
        isMobile={isMobile}
      />
      <Countdown
        template={template}
        value={String(countdown.min).padStart(2, "0")}
        label="min"
        isMobile={isMobile}
      />
      <Countdown
        template={template}
        value={String(countdown.sec).padStart(2, "0")}
        label="sec"
        isMobile={isMobile}
      />
    </HStack>
  );
}
