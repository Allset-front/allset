"use client";

import React from "react";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const Countdown = ({ template, value, label, isMobile }) => {
  const t = useTranslations();

  if (template === "template.modern.romance") {
    return (
      <Stack align="center" gap="12px">
        <Text
          fontSize={isMobile ? "36px" : "50px"}
          fontWeight="1000"
          color="#F3F3F3"
          lineHeight="24px"
        >
          {value}
        </Text>
        <Text
          fontSize={isMobile ? "12px" : "14px"}
          fontWeight="800"
          color="#F3F3F3"
          lineHeight="25px"
          textTransform="uppercase"
        >
          {t(label)}
        </Text>
      </Stack>
    );
  }

  if (template === "template.classic.elegance") {
    return (
      <HStack align="baseline" gap="8px">
        <Text
          fontSize={isMobile ? "36px" : "50px"}
          fontWeight="400"
          color="var(--c-primary)"
          lineHeight="28px"
        >
          {value}
        </Text>
        <Text
          fontSize={isMobile ? "12px" : "34px"}
          fontWeight="400"
          color="var(--c-primary)"
          lineHeight="28px"
          textTransform="lowercase"
        >
          {t(label)}
        </Text>
      </HStack>
    );
  }

  return (
    <HStack align="baseline" gap="10px">
      <Text
        fontFamily="var(--font-shk)"
        fontSize={isMobile ? "36px" : "74px"}
        fontWeight="400"
        color="var(--c-primary)"
        lineHeight="24px"
      >
        {value}
      </Text>
      <Text
        fontFamily="var(--font-shk)"
        fontSize={isMobile ? "12px" : "34px"}
        fontWeight="400"
        color="var(--c-primary)"
        lineHeight="24px"
        textTransform="lowercase"
      >
        {t(label)}
      </Text>
    </HStack>
  );
};
