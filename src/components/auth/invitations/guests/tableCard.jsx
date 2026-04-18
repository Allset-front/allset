"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const TableCard = ({ number, guests }) => {
  const t = useTranslations();

  return (
    <Box as="ul" bg="#80A0A10D" minW={{ base: "100%", md: "230px" }} p="8px">
      <Text
        color={"#4B5563"}
        fontSize={"14px"}
        lineHeight={"24px"}
        fontWeight="600"
      >
        {t("table")} {number}
      </Text>

      {guests.map((guest, idx) => (
        <Box
          as="li"
          key={idx}
          color={"#4B5563"}
          fontSize={"12px"}
          lineHeight={"24px"}
          fontWeight="400"
        >
          {idx + 1}. {guest}
        </Box>
      ))}
    </Box>
  );
};
