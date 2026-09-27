"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { TopPart } from "@/components/build/topPart";
import { BottomPart } from "@/components/build/bottomPart";
import { Box, Button, Container, Icon } from "@chakra-ui/react";
import { back } from "@/assets/svgs";
import bg from "@/assets/imgs/build_bg.png";

export default function Layout({ children }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const isBare =
    pathname?.includes("confirm") || pathname?.includes("module");

  // confirm/module keep natural page flow (no pinned footer).
  if (isBare) {
    return (
      <Box
        bgImage={{ base: `url(${bg.src})` }}
        minW={"100%"}
        minH={"100%"}
        bgSize="contain"
        bgRepeat="no-repeat"
      >
        {pathname?.includes("confirm") && (
          <Container
            maxW="1440px"
            px={{ base: "24px", md: "40px" }}
            pt={{ base: "24px", md: "32px" }}
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              w="fit-content"
              fontWeight="400"
              lineHeight="24px"
              color="#004143"
              h="52px"
              px="8px"
            >
              <Icon>{back.icon}</Icon>
              {t("back")}
            </Button>
          </Container>
        )}
        <TopPart />
        <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
          {children}
        </Container>
      </Box>
    );
  }

  // The global header (sticky, 90px) shows on every step at md+, and also on
  // mobile for the templates step; it is hidden on mobile for later steps.
  const isTemplates = pathname?.includes("/build/templates");
  const columnHeight = isTemplates
    ? "calc(100dvh - 90px)"
    : { base: "100dvh", md: "calc(100dvh - 90px)" };

  // Pin the step header/title and footer, let the step content scroll between.
  return (
    <Box
      bgImage={{ base: `url(${bg.src})` }}
      display="flex"
      flexDirection="column"
      h={columnHeight}
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <TopPart />
      <Box flex="1" minH="0" overflowY="auto">
        <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
          {children}
        </Container>
      </Box>
      <BottomPart />
    </Box>
  );
}
