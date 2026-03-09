"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

export const Info = () => {
  const t = useTranslations();

  const { id } = useParams();
  const { isLoading, data } = useGetAuthTanstack(
    `confirmations/invitation/${id}/stats`,
  );

  if (isLoading) {
    return (
      <Flex gap="16px">
        <Skeleton w="156px" h="40px" borderRadius="8px" />
        <Skeleton w="156px" h="40px" borderRadius="8px" />
        <Skeleton w="156px" h="40px" borderRadius="8px" />
      </Flex>
    );
  }

  return (
    <Flex gap="16px">
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#289600"}
        background={"#26A0361C"}
        p="8px 27.5px"
        minW="156px"
        borderRadius={"8px"}
      >
        {t("confirmed")}{" "}
        <Box as="span" color={"#2E8D3B"} fontWeight={600}>
          {data?.confirmed}
        </Box>
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#CF2B2B"}
        background={"#FF552E1C"}
        p="8px 27.5px"
        minW="156px"
        borderRadius={"8px"}
      >
        {t("declined")}{" "}
        <Box as="span" color={"#CF2B2B"} fontWeight={600}>
          {data?.notComing}
        </Box>
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={"400"}
        lineHeight={"24px"}
        color={"#4B5563"}
        background={"#FFFFFF"}
        p="8px 27.5px"
        minW="156px"
        borderRadius={"8px"}
      >
        {t("total")}{" "}
        <Box as="span" color={"#4B5563"} fontWeight={600}>
          {data?.totalGuests}
        </Box>
      </Text>
    </Flex>
  );
};
