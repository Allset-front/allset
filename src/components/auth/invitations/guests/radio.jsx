"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { HStack, RadioGroup, Text } from "@chakra-ui/react";
import { guestEditOptions } from "@/utils/constants";

export const Radio = ({ value, onChange }) => {
  const t = useTranslations();
  
  return (
    <RadioGroup.Root value={value} onValueChange={(e) => onChange(e.value)}>
      <Text fontSize="12px" fontWeight="400" color="#6B7280">
        {t("guest_side")}
      </Text>
      <HStack gap="24px" mt={"12px"}>
        {guestEditOptions?.map((el) => (
          <RadioGroup.Item key={el} value={el}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator background={el == value && "#004143"} />

            <RadioGroup.ItemText>{t(el.toLowerCase())}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  );
};
