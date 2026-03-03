"use client";

import React from "react";
import { Stack, Container, Center, Flex, Image } from "@chakra-ui/react";
import { Accordion } from "./accordion";
import { Title } from "./typography/title";
import { Description } from "./typography/description";
import bg from "@/assets/imgs/faqs_bg.png";

export const Faqs = ({ faqs }) => {
  return (
    <Stack p={"100px 0 50px 0"} bg="#f6f6f7">
      <Container maxW="1360px" px={0}>
        <Stack gap="45px">
          <Center>
            <Flex gap={"41px"} align={"center"}>
              <Stack gap={"16px"} textAlign={"center"}>
                <Title text="faqs" />
                <Description text="faqs_description" width={"479px"} />
              </Stack>
              <Image src={bg.src} alt="faqs" />
            </Flex>
          </Center>
          <Accordion faqs={faqs} />
        </Stack>
      </Container>
    </Stack>
  );
};
