"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { HStack, IconButton, Text, Box, Stack } from "@chakra-ui/react";
import { decrease, increase } from "@/assets/svgs";

export const Collection = ({ value, onChange }) => {
  const t = useTranslations();

  const onDecrease = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const onIncrease = () => {
    onChange(value + 1);
  };

  return (
    <Stack gap="12px">
      <Text fontSize="12px" fontWeight="400" color="#6B7280">
        {t("guest_side")}
      </Text>
      <Box w="fit-content" bg="#F9FAFB" borderRadius="full" px="16px" py="8px">
        <HStack gap="8px">
          <IconButton
            aria-label="Decrease"
            variant="ghost"
            size="xs"
            borderRadius="full"
            onClick={onDecrease}
            disabled={value === 0}
          >
            {decrease.icon}
          </IconButton>

          <Text
            fontWeight="500"
            minW="24px"
            textAlign="center"
            p="10px"
            w="44px"
            borderRadius="full"
            bg={"#FFFFFF"}
          >
            {value}
          </Text>

          <IconButton
            aria-label="Increase"
            variant="ghost"
            size="xs"
            borderRadius="full"
            onClick={onIncrease}
          >
            {increase.icon}
          </IconButton>
        </HStack>
      </Box>
    </Stack>
  );
};
