"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import bg from "@/assets/imgs/referal_bg.png";
import { Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { distribute } from "@/services/distribution";
import { share } from "@/assets/svgs";

export const Referal = ({ code }) => {
  const t = useTranslations();
  const language = useLocale();

  return (
    <Stack
      w="100%"
      minH="154px"
      bgImage={{
        base: `
      url(${bg.src}),
      linear-gradient(0deg, rgba(75,108,118,0.6), rgba(75,108,118,0.6)),
      radial-gradient(70.85% 125.46% at 5.54% 13.64%, rgba(255, 255, 255, 0.3) 0.96%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(80.43% 104.04% at 96.79% 100%, rgba(18, 9, 41, 0.35) 0%, rgba(28, 2, 96, 0) 100%),
      radial-gradient(72.73% 72.73% at 72.74% -12.12%, rgba(115, 111, 110, 0.4) 0%, rgba(190, 76, 59, 0) 100%)
    `,
      }}
      bgSize="contain"
      bgRepeat="no-repeat"
      bgPos={"right"}
      borderRadius={"20px"}
      p={{ base: "26px 35px", md: "16px 24px" }}
      gap={{ base: "15px", md: "11px" }}
    >
      <Heading size="lg" color={"white"}>
        {t("referral")}
      </Heading>

      <Text
        fontSize={"14px"}
        color={"white"}
        w={{ base: "90%", md: "70%" }}
        // lineClamp={{ base: 3, xl: 2 }}
      >
        {t("referral_text")}
      </Text>

      <Button
        gap={"15px"}
        fontWeight="500"
        fontSize={"12px"}
        bg="#375057"
        w="163px"
        h="40px"
        borderRadius={"20px"}
        transition="all 0.3s ease"
        onClick={() => distribute({ language, code })}
        _hover={{
          bg: "#004143",
        }}
      >
        <Icon>{share.icon}</Icon>
        {t("copy")}
      </Button>
    </Stack>
  );
};
