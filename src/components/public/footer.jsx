"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { mainPages, socialPages, social } from "@/utils/constants";
import { getCurrentYear } from "@/utils/helpers";
import {
  Box,
  Container,
  Flex,
  For,
  Icon,
  Separator,
  Text,
  Stack,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react";
import logo from "@/assets/imgs/allset.png";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();
  const pathname = usePathname();

  if (pathname?.includes("build") || pathname?.includes("auth")) return;

  return (
    <Box bg="#FFFFFF">
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        {/* <Box> */}
        <Flex
          py={{ base: "32px", sm: "29px" }}
          gap="64px"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Stack gap={"24px"} align={{ base: "center", sm: "unset" }}>
            <ChakraLink as={Link} href="/" gap="12px" w="fit-content">
              <Image src={logo.src} w="94px" h="58px" alt="AllSet" />
            </ChakraLink>
            <Text
              w={{ base: "fit-content", lg: "525px" }}
              fontSize={"14px"}
              fontWeight={"300"}
              color={"#4B5563"}
              textAlign={{ base: "center", sm: "unset" }}
            >
              {t("footer_about")}
            </Text>
            <Flex gap={"16px"}>
              <For each={social}>
                {({ icon, href }, index) => (
                  <ChakraLink as={Link} target="_blank" key={index} href={href}>
                    <Icon>{icon.icon}</Icon>
                  </ChakraLink>
                )}
              </For>
            </Flex>
          </Stack>

          <Flex
            gap={{ base: "24px", md: "56px" }}
            align={"center"}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Stack
              gap={{ base: "24px", sm: "12px" }}
              align={{ base: "center", sm: "unset" }}
            >
              <For each={mainPages}>
                {({ name, path }) => {
                  const isActive = pathname === `/${path}`;

                  return (
                    <ChakraLink
                      key={path}
                      href={`/${path}`}
                      as={Link}
                      color={isActive ? "#004143" : "#4B5563"}
                      fontSize={"16px"}
                      fontWeight={isActive ? "500" : "400"}
                      borderRadius="0"
                      w="fit-content"
                    >
                      {t(name)}
                    </ChakraLink>
                  );
                }}
              </For>
            </Stack>
            <Stack
              gap={{ base: "24px", sm: "12px" }}
              align={{ base: "center", sm: "unset" }}
            >
              <For each={socialPages}>
                {({ name, path }) => {
                  const isActive = pathname === `/${path}`;

                  return (
                    <ChakraLink
                      key={path}
                      href={`/${path}`}
                      as={Link}
                      color={isActive ? "#004143" : "#4B5563"}
                      fontSize={"16px"}
                      fontWeight={isActive ? "500" : "400"}
                      borderRadius="0"
                      w="fit-content"
                    >
                      {t(name)}
                    </ChakraLink>
                  );
                }}
              </For>
            </Stack>
          </Flex>
        </Flex>
        <Separator display={{ base: "none", sm: "block" }} />
        <Text
          // pt="10px"
          fontSize={"14px"}
          fontWeight={"300"}
          color={"#4B5563"}
          py={{ base: "24px", sm: "16px" }}
          textAlign={{ base: "center", sm: "unset" }}
        >
          © {getCurrentYear()} AllSet All rights reserved
        </Text>
        {/* </Box> */}
      </Container>
    </Box>
  );
};
