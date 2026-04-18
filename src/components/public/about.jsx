"use client";

import React from "react";
import { Stack, Container, Flex, Box } from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { Description } from "./typography/description";

export const About = () => {
  return (
    <Stack py="80px" bg="#f6f6f7">
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex w="100%" justify={"space-between"} gap="110px">
          <Stack flex="1" gap="24px">
            <Title as="h1" fontSize="42px" text="about" color="#004143" />
            <SubTitle text="plan_subtitle" />
            <Description text="plan_desc" textAlign="start" />
          </Stack>

          <Box
            flex="1"
            w="590px"
            h="242px"
            bg="#D9D9D9"
            borderRadius="5px"
          ></Box>
        </Flex>
      </Container>
    </Stack>
  );
};
