"use client";

import React from "react";
import {
  Stack,
  Container,
  Flex,
  Image,
  Text,
  Span,
  Separator,
  useMediaQuery,
} from "@chakra-ui/react";
import { Title } from "./typography/title";
import img from "@/assets/imgs/story_bg.png";
import imgMobile from "@/assets/imgs/story_bg_mobile.png";

export const Story = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  return (
    <Stack p={{ base: "50px 0 64px 0", md: "50px 0 100px 0" }} bg="#f6f6f7">
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex
          w="100%"
          gap={{ base: "32px", md: "103px" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Stack gap="42px" justify={"center"}>
            <Title text="story_title" />

            <Stack gap={{ base: "24px", md: "32px" }}>
              <Flex
                gap={{ base: "24px", md: "32px" }}
                flexDirection={{ base: "column", md: "unset" }}
              >
                <Stack as="ul" flex={1} gap={"12px"}>
                  <Separator borderColor="#AC8A5F" borderWidth="3px" />
                  <li>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={700}
                      color={"#161E24"}
                    >
                      30+ երջանիկ զույգեր
                    </Text>
                  </li>
                  <li>
                    <Span
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={400}
                      color={"#4B5563"}
                    >
                      Ստեղծում ենք գեղեցիկ հրավերներ, որոնք զույգերը կսիրեն և
                      կհիշեն հավերժ
                    </Span>
                  </li>
                </Stack>
                <Stack as="ul" flex={1} gap={"12px"}>
                  <Separator borderColor="#AC8A5F" borderWidth="3px" />
                  <li>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={700}
                      color={"#161E24"}
                    >
                      4000+ հյուրեր
                    </Text>
                  </li>
                  <li>
                    <Span
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={400}
                      color={"#4B5563"}
                    >
                      Lorem ipsum est quam aliquam quam nulla morbi in nulla.
                    </Span>
                  </li>
                </Stack>
              </Flex>
              <Flex
                gap={{ base: "24px", md: "32px" }}
                flexDirection={{ base: "column", md: "unset" }}
              >
                <Stack as="ul" flex={1} gap={"12px"}>
                  <Separator borderColor="#AC8A5F" borderWidth="3px" />
                  <li>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={700}
                      color={"#161E24"}
                    >
                      100% գոհունակություն
                    </Text>
                  </li>
                  <li>
                    <Span
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={400}
                      color={"#4B5563"}
                    >
                      Ավելի քան 10 յուրահատուկ հրավերների ոճ՝ ստեղծված
                      յուրաքանչյուր առիթի համար
                    </Span>
                  </li>
                </Stack>
                <Stack as="ul" flex={1} gap={"12px"}>
                  <Separator borderColor="#AC8A5F" borderWidth="3px" />
                  <li>
                    <Text
                      fontSize={{ base: "18px", md: "20px" }}
                      fontWeight={700}
                      color={"#161E24"}
                    >
                      3 լեզուներ
                    </Text>
                  </li>
                  <li>
                    <Span
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight={400}
                      color={"#4B5563"}
                    >
                      Երեք լեզվով հասանելի՝ հայերեն, անգլերեն, ռուսերեն
                    </Span>
                  </li>
                </Stack>
              </Flex>
            </Stack>
          </Stack>

          <Stack
            mx={{ base: "auto", md: "auto" }}
            maxW={{ base: "264px", md: "710px" }}
            maxH={{ base: "440px", md: "534px" }}
          >
            <Image
              src={isMobile ? imgMobile.src : img.src}
              w="100%"
              h="100%"
              objectFit={{ base: "cover", md: "contain" }}
              borderRadius={"20px"}
              alt="story img"
            />
          </Stack>
        </Flex>
      </Container>
    </Stack>
  );
};
