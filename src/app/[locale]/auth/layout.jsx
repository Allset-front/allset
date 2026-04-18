"use client";

import React from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container } from "@chakra-ui/react";
import { Head } from "@/components/auth/head";
import {
  getAuthBg,
  getAuthBgPos,
  getAuthBgSize,
  getAuthTitle,
} from "@/utils/helpers";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, isAuthenticated } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return router.push(`/`);
  }

  return (
    <Box
      bgImage={{ base: getAuthBg(pathname) }}
      minW={"100%"}
      minH={"100%"}
      // pt={"50px"}
      p={{ base: "32px 0 62px 0", md: "50px 0 50px 0" }}
      bgSize={getAuthBgSize(pathname)}
      bgPos={getAuthBgPos(pathname)}
      bgRepeat="no-repeat"
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Head text={getAuthTitle(pathname)} />
        {/* <Separator colorPalette="blue" pb={"16px"} /> */}
        <Box
          borderBottom="1px solid"
          borderImageSource="linear-gradient(90deg, #E7E7E7 0%, #F9FAFB 72.18%)"
          borderImageSlice={1}
          mb={"16px"}
        />
        {children}
      </Container>
    </Box>
  );
}
