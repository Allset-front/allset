"use client";

import React from "react";
import { noInvitations } from "@/assets/svgs";
import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const Empty = ({ type }) => {
  const t = useTranslations();

  return (
    <VStack gap="20px" alignItems={"center"} justify={"center"} h="70vh">
      <Icon>{noInvitations.icon}</Icon>
      <Text fontWeight={"500"} fontSize={"16px"} color={"#4B5563"}>
        {type === "active"
          ? t("no_active")
          : type === "drafts"
            ? t("no_drafts")
            : t("no_expired")}
      </Text>
      <Button
        bg="#80A0A1"
        borderRadius="20px"
        minW="278px"
        h={"52px"}
        fontSize={"14px"}
        fontWeight={"500"}
        _hover={{
          bg: "#004143",
          transition: "all 0.3s ease",
        }}
      >
        {t("get_off")}
      </Button>
    </VStack>
  );
};
