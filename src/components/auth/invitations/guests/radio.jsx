"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { HStack, RadioGroup, Text } from "@chakra-ui/react";
import { guestEditOptions } from "@/utils/constants";

export const Radio = ({ color = "#111111", value, onChange }) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <RadioGroup.Root value={value} onValueChange={(e) => onChange(e.value)}>
      <Text
        fontSize="12px"
        fontWeight="400"
        color={color}
        textAlign={pathname?.includes("auth") ? "unset" : "center"}
      >
        {t("guest_side")}
      </Text>
      <HStack gap="24px" mt={"12px"} color={color}>
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
