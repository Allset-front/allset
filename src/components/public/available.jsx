"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Stack, Container, Flex, For, Text, Span } from "@chakra-ui/react";
import { Title } from "./typography/title";
import { Description } from "./typography/description";
import { available } from "@/utils/constants";

export const Available = () => {
  const t = useTranslations();

  return (
    <Stack bg="#FFFFFF" py={{ base: "64px", md: "55px" }}>
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex
          w="100%"
          flexDirection={{ base: "column", xl: "row" }}
          gap={{ base: "64px", xl: "17px" }}
        >
          <Stack gap="16px" w={{ base: "fit-content", xl: "428px" }}>
            <Title
              text="available"
              textAlign={{ base: "center", md: "unset" }}
            />
            <Description
              text="available_description"
              textAlign={{ base: "center", md: "start" }}
            />
          </Stack>

          <Flex
            gap="16px"
            justifyContent={{ base: "space-between", xl: "unset" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <For each={available}>
              {({ id, bg, icon, iconBg, title, description }) => (
                <Stack
                  key={id}
                  bg={bg}
                  p="16px"
                  borderRadius="5px"
                  w={{ base: "100%", md: "294px" }}
                  maxH="270px"
                >
                  <Flex
                    w="62px"
                    h="62px"
                    borderRadius="100%"
                    bg={iconBg}
                    align="center"
                    justify="center"
                  >
                    {icon.icon}
                  </Flex>
                  <Text fontSize={"18px"} fontWeight={700} color={"#FFFFFF"}>
                    {t(title)}
                  </Text>
                  <Span fontSize={"14px"} fontWeight={400} color={"#FFFFFF"}>
                    {t(description)}
                  </Span>
                </Stack>
              )}
            </For>
          </Flex>
        </Flex>
      </Container>
    </Stack>
  );
};
