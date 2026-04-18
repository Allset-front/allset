"use client";

import { usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Link } from "@/i18n/routing";
import { OAuth } from "./oauth";
import logo from "@/assets/imgs/allset.png";
import { Language } from "./language";
import { Navigation } from "./navigation";
import { Hamburger } from "./hamburger";

export const Header = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const isPublic = pathname === `/` || pathname === `/about-us`;
  const bg = isPublic ? (scrolled ? "#FFFFFF" : "#f6f6f7") : "#FFFFFF";

  useEffect(() => {
    if (!isPublic) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="header"
      w="100%"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      bg={bg}
      // bg="#f6f6f7"
      // boxShadow="sm"
      py="16px"
      px="0"
      transition="background 0.3s ease"
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex align="center" justify="space-between">
          <ChakraLink as={Link} href="/" gap="12px">
            <Image src={logo.src} w="94px" h="58px" alt="AllSet" />
          </ChakraLink>

          <HStack display={{ base: "none", md: "flex" }}>
            <Navigation />
          </HStack>

          <Flex gap="16px" display={{ base: "none", md: "flex" }}>
            <Language bg={bg} />
            <OAuth bg={bg} />
          </Flex>

          <Hamburger bg={bg}>
            <Stack gap="20px">
              <Navigation direction={"column"} />
              <OAuth bg={bg} noMenu={true} />
              <Language bg={bg} noMenu={true} />
            </Stack>
          </Hamburger>
        </Flex>
      </Container>
    </Box>
  );
};
