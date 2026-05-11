"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useRouter } from "@/i18n/routing";
import { back } from "@/assets/svgs";
import { Button, Icon, Stack } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

export const Pay = () => {
  const t = useTranslations();
  const router = useRouter();

  const [{ legal, payment }] = useQueryStates({
    legal: parseAsString,
    payment: parseAsString,
  });

  return (
    <Stack gap="16px">
      <Tooltip
        // ids={{ trigger: id }}
        positioning={{ placement: "top" }}
        content={
          !payment
            ? "Choose paymant method"
            : !legal
              ? "Please agree terms and policy"
              : "Pay"
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
      <Button
        onClick={() => router.back()}
        variant="ghost"
        fontWeight="400"
        lineHeight="24px"
        color="#004143"
        // border={"1px solid"}
        // borderColor={"#4B5563"}
        w="100%"
        h="52px"
      >
        <Icon>{back.icon}</Icon>
        {/* {t("back")} {t(backInfo?.name)} */}
        {t("back")}
      </Button>
    </Stack>
  );
};
