"use client";

import React from "react";
import { useLocale } from "next-intl";
import {
  Stack,
  Container,
  Flex,
  Image,
  Span,
  useMediaQuery,
} from "@chakra-ui/react";
import { Title } from "./typography/title";
import bg from "@/assets/imgs/special_bg.png";
import bgMobile from "@/assets/imgs/special_bg_mobile.png";
import img from "@/assets/imgs/special_img.png";

export const Promo = ({ promo }) => {
  const language = useLocale();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const content = (
    <Flex
      bgImage={{ base: `url(${bgMobile.src})`, md: `url(${bg.src})` }}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      //   backgroundBlendMode={"overlay"}
      w="100%"
      h={{ base: "285px", md: "185px" }}
      align="center"
      overflow="hidden"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Stack w="100%" p={{base:"24px 0",md:"32px 0 32px 32px"}}>
        <Title
          color="#FFFFFF"
          text={promo.title[language]}
          textAlign={{ base: "center", md: "unset" }}
        />
        <Span
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight={400}
          color={"#FFFFFF"}
          textAlign={{ base: "center", md: "unset" }}
        >
          {promo.description[language]}
        </Span>
      </Stack>
      <Image
        src={img.src}
        alt="special_img"
        w="fit-content"
        h="100%"
        objectFit="contain"
        pr={{ base: 0, md: "40px" }}
        // flexShrink={0}
      />
    </Flex>
  );

  return (
    <Stack py={{ base: 0, md: "64px" }} bg="#f6f6f7">
      {isMobile ? (
        content
      ) : (
        <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
          {content}
        </Container>
      )}
    </Stack>
  );
};
