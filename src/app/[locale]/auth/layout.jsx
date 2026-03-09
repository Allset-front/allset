"use client";

import React from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container, Separator } from "@chakra-ui/react";
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
      pt={"50px"}
      bgSize={getAuthBgSize(pathname)}
      bgPos={getAuthBgPos(pathname)}
      bgRepeat="no-repeat"
    >
      <Container maxW="1360px" px={0}>
        <Head text={getAuthTitle(pathname)} />
        <Separator colorPalette="blue" pb={"16px"}/>
        {children}
      </Container>
    </Box>
  );
}
