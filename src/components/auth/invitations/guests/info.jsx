"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Box, Flex, Text } from "@chakra-ui/react";

export const Info = () => {
  const t = useTranslations();

  return (
    <Flex gap="16px">
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#289600"}
        background={"#26A0361C"}
        p="8px 27.5px"
        borderRadius={"8px"}
      >
        {t("confirmed")}{" "}
        <Box as="span" color={"#2E8D3B"} fontWeight={600}>
          24
        </Box>
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#CF2B2B"}
        background={"#FF552E1C"}
        p="8px 27.5px"
        borderRadius={"8px"}
      >
        {t("declined")}{" "}
        <Box as="span" color={"#CF2B2B"} fontWeight={600}>
          18
        </Box>
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#4B5563"}
        background={"#FFFFFF"}
        p="8px 27.5px"
        borderRadius={"8px"}
      >
        {t("declined")}{" "}
        <Box as="span" color={"#4B5563"} fontWeight={600}>
          84
        </Box>
      </Text>
    </Flex>
  );
};
