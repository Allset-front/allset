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
    <Stack bg="#FFFFFF" py="62px">
      <Container maxW="1360px" px={0}>
        <Flex w="100%" justify={"space-between"} gap="17px">
          <Stack gap="16px" w="428px">
            <Title text="available" />
            <Description text="available_description" textAlign="start" />
          </Stack>

          <Flex gap="16px">
            <For each={available}>
              {({ id, bg, icon, iconBg, title, description }) => (
                <Stack
                  key={id}
                  bg={bg}
                  p="16px"
                  borderRadius="5px"
                  w="294px"
                  h="270px"
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
