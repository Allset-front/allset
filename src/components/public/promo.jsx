"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Stack, Container, Flex, Image, Span } from "@chakra-ui/react";
import { Title } from "./typography/title";
import bg from "@/assets/imgs/special_bg.png";
import img from "@/assets/imgs/special_img.png";

export const Promo = ({ promo }) => {
  const language = useLocale();

  return (
    <Stack py="64px" bg="#f6f6f7">
      <Container maxW="1360px" px={0}>
        <Flex
          bgImage={`url(${bg.src})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          //   backgroundBlendMode={"overlay"}
          w="100%"
          h="185px"
          //   justify="space-between"
          align="center"
          overflow="hidden"
        >
          <Stack w="100%" p="32px 0 32px 32px">
            <Title
              color="#FFFFFF"
              text={promo.title[language]}
            />
            <Span fontSize={"16px"} fontWeight={400} color={"#FFFFFF"}>
              {promo.description[language]}
            </Span>
          </Stack>
          <Image
            src={img.src}
            alt="special_img"
            w="fit-content"
            h="100%"
            objectFit="contain"
            pr="40px"
            // flexShrink={0}
          />
        </Flex>
      </Container>
    </Stack>
  );
};
