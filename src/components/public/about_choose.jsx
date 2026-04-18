"use client";

import React from "react";
import { Stack, Container, Flex, Box } from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { Description } from "./typography/description";
import bg from "@/assets/imgs/planning_bg.png";

export const AboutChoose = () => {
  return (
    <Stack
      p="90px 0 50px 0"
      bgImage={`url(${bg.src})`}
      bgPos="right 40px top"
      bgRepeat={"no-repeat"}
      bgSize={"297px"}
      backgroundColor="#f6f6f7"
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex w="100%" justify={"space-between"} gap="110px">
          <Stack flex="1" gap="24px">
            <Title as="h1" text="plan_title_two" />
            <SubTitle text="choose_desc_one" />
            <Description text="choose_desc_two" textAlign="start" />
          </Stack>

          <Flex flex="1" gap={"28px"}>
            <Box w="281px" h="334px" bg="#D9D9D9" borderRadius="5px"></Box>
            <Box
              w="281px"
              h="334px"
              bg="#D9D9D9"
              borderRadius="5px"
              mt="146px"
            ></Box>
          </Flex>
        </Flex>
      </Container>
    </Stack>
  );
};
