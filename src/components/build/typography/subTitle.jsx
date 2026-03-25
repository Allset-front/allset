"use client";

import { useTranslations } from "next-intl";
import { Text } from "@chakra-ui/react";

export const SubTitle = ({ text }) => {
  const t = useTranslations();

  return (
    <Text
      color={"#4B5563"}
      w={{base:"90%",lg:"672px"}}
      fontSize={{ base: "14px", md: "16px" }}
      textAlign={"center"}
    >
      {t(text)}
    </Text>
  );
};
