"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Text } from "@chakra-ui/react";

export const Description = ({ text, width, textAlign }) => {
  const t = useTranslations();

  return (
    <Text
      width={width ?? "fit-content"}
      fontSize={{ base: "14px", lg: "16px" }}
      lineHeight={"26px"}
      color={"#4B5563"}
      fontWeight={300}
      textAlign={textAlign ?? "center"}
    >
      {t(text)}
    </Text>
  );
};
