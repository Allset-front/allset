"use client";

import React from "react";
import { Stack, Container, Center, Flex, Image } from "@chakra-ui/react";
import { Accordion } from "./accordion";
import { Title } from "./typography/title";
import { Description } from "./typography/description";
import bg from "@/assets/imgs/faqs_bg.png";

export const Faqs = ({ faqs }) => {
  return (
    <Stack p={{base:"80px 0 50px 0",md:"100px 0 50px 0"}} bg="#f6f6f7">
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Stack gap={{ base: "32px", md: "45px" }}>
          <Center justifyContent={{ base: "flex-start", md: "center" }}>
            <Flex
              gap={{ base: "28px", md: "41px" }}
              align={{ base: "start", md: "center" }}
            >
              <Stack gap={{ base: "8px", md: "16px" }} textAlign={"center"}>
                <Title text="faqs" textAlign={{ base: "start", md: "unset" }} />
                <Description
                  text="faqs_description"
                  width={{ base: "fit-content", md: "479px" }}
                  textAlign={{ base: "start", md: "unset" }}
                />
              </Stack>
              <Image
                src={bg.src}
                alt="faqs"
                h={{ base: "102px", md: "fit-content" }}
              />
            </Flex>
          </Center>
          <Accordion faqs={faqs} />
        </Stack>
      </Container>
    </Stack>
  );
};
