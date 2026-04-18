"use client";

import React from "react";
import { usePathname } from "@/i18n/routing";
import { TopPart } from "@/components/build/topPart";
import { BottomPart } from "@/components/build/bottomPart";
import { Box, Container } from "@chakra-ui/react";
import bg from "@/assets/imgs/build_bg.png";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <Box
      bgImage={{ base: `url(${bg.src})` }}
      minW={"100%"}
      minH={"100%"}
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <TopPart />
      <Container
        maxW="1440px"
        px={{ base: "24px", md: "40px" }}
      >
        {children}
      </Container>
      {!pathname?.includes("confirm") && <BottomPart />}
    </Box>
  );
}
