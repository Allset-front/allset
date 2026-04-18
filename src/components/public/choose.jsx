"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@chakra-ui/react";
import {
  Stack,
  Container,
  Flex,
  Image,
  For,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import bg from "@/assets/imgs/choose_bg.png";
import img from "@/assets/imgs/choose_img.png";
import imgMobile from "@/assets/imgs/choose_img_mobile.png";
import { choose } from "@/utils/constants";
import { dash } from "@/assets/svgs";
import { Animate } from "../ui/animate";

export const Choose = () => {
  const t = useTranslations();
  const [isLaptop] = useMediaQuery("(max-width: 1023px)");

  return (
    <Stack
      bg="#004143"
      p="40px 0 84px 0"
      bgImage={{ base: "unset", lg: `url(${bg.src})` }}
      bgPos={"right"}
      bgRepeat={"no-repeat"}
    >
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Flex
          w="100%"
          flexDirection={{ base: "column", lg: "row" }}
          gap={{ base: "52px", lg: "106px" }}
        >
          <Stack gap={"32px"}>
            <Stack gap={{ base: "16px", md: "8px" }}>
              <Title
                text="choose_title"
                color="#FFFFFF"
                textAlign={{ base: "center", lg: "unset" }}
              />
              <SubTitle
                text="choose_desc"
                textAlign={{ base: "center", lg: "unset" }}
              />
            </Stack>

            {isLaptop && (
              <Stack
                // w={{ base: "100%", md: "fit-content" }}
                mx={"auto"}
                maxW={"264px"}
                maxH={"440px"}
              >
                <Image
                  src={imgMobile.src}
                  w="100%"
                  h="100%"
                  objectFit={"contain"}
                  borderRadius={"20px"}
                  alt="Choose Image"
                />
              </Stack>
            )}

            <Stack gap={{ base: "24px", lg: "34px" }}>
              <For each={choose}>
                {({ id, title, description }) => (
                  <Animate>
                    <Stack
                      as="ul"
                      key={id}
                      gap={{ base: "16px", md: "6px" }}
                      alignItems={{ base: "center", md: "unset" }}
                    >
                      <HStack
                        as="li"
                        gap="13px"
                        fontSize={"18px"}
                        lineHeight={"24px"}
                        fontWeight={500}
                        color={"#FFFFFF"}
                        textAlign={{ base: "center", md: "unset" }}
                      >
                        <Icon>{dash.icon}</Icon>
                        {t(title)}
                        <Icon display={{ base: "block", lg: "none" }}>
                          {dash.icon}
                        </Icon>
                      </HStack>
                      <HStack
                        as="li"
                        fontSize={"14px"}
                        lineHeight={"24px"}
                        fontWeight={300}
                        color={"#D9D9D9"}
                        pl={{ base: 0, md: "43px" }}
                        textAlign={{ base: "center", md: "unset" }}
                      >
                        {t(description)}
                      </HStack>
                    </Stack>
                  </Animate>
                )}
              </For>
            </Stack>
          </Stack>

          {!isLaptop && (
            <Stack
              // w={{ base: "100%", md: "fit-content" }}
              mx={"auto"}
              maxW={"710px"}
              maxH={"688px"}
            >
              <Image
                src={img.src}
                w="100%"
                h="100%"
                objectFit={"contain"}
                borderRadius={"20px"}
                alt="Choose Image"
              />
            </Stack>
          )}
        </Flex>
      </Container>
    </Stack>
  );
};
