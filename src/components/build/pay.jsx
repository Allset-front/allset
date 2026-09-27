"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { Button, Stack } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

export const Pay = () => {
  const t = useTranslations();

  const [{ legal, payment }] = useQueryStates({
    legal: parseAsString,
    payment: parseAsString,
  });

  return (
    <Stack gap="16px">
      <Tooltip
        positioning={{ placement: "top" }}
        content={
          !payment
            ? t("payment_method_text")
            : !legal
              ? t("agree")
              : t("pay")
        }
      >
        <Button
          type="submit"
          form="confirm"
          fontWeight="400"
          lineHeight="24px"
          bg="#004143"
          w="100%"
          h="52px"
          border="1px solid"
          boxShadow="xl"
          borderColor="#4B5563"
          disabled={!legal || !payment}
          _hover={{ bg: "white", color: "#004143" }}
        >
          {t("pay")}
        </Button>
      </Tooltip>
    </Stack>
  );
};
