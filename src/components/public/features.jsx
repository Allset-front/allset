"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Stack, Container, For, Flex, Text, Span } from "@chakra-ui/react";
import bg from "@/assets/imgs/features_bg.png";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { features } from "@/utils/constants";

export const Features = () => {
  const t = useTranslations();

  return (
    <Stack
      bgImage={`url(${bg.src})`}
      bgPos={{base:"right 14px",lg:"right 81px"}}
      bgRepeat={"no-repeat"}
      bgSize={{base:"109px",md:"162px"}}
      py={{ base: "80px", md: "100px" }}
      backgroundColor="#f6f6f7"
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Stack gap="8px">
          <Title text="features" textAlign={{ base: "center", md: "unset" }} />
          <SubTitle
            text="features_description"
            textAlign={{ base: "center", md: "unset" }}
          />
        </Stack>
        <Flex
          gap={{ base: "32px", xl: "120px" }}
          pt={{ base: "32px", md: "42px" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <For each={features}>
            {({ id, title, description }) => (
              <Flex
                key={id}
                as="ul"
                gap="12px"
                flexDirection={"column"}
                align={{ base: "center", md: "unset" }}
                textAlign={{ base: "center", md: "unset" }}
              >
                <li>
                  <Text
                    fontWeight={500}
                    fontSize={{ base: "20px", md: "22px" }}
                    color={"#161E24"}
                  >
                    {t(title)}
                  </Text>
                </li>
                <li>
                  <Span fontWeight={300} fontSize={"14px"} color={"#4B5563"}>
                    {t(description)}
                  </Span>
                </li>
              </Flex>
            )}
          </For>
        </Flex>
      </Container>
    </Stack>
  );
};
