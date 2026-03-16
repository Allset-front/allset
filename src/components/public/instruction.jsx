"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Stack,
  Container,
  Flex,
  Button,
  For,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { instruction } from "@/utils/constants";

export const Instruction = () => {
  const t = useTranslations();
  const router = useRouter();

  const [wrap] = useMediaQuery("(max-width: 1440px)");

  return (
    <Stack p={{ base: "80px 0", md: "36px 0 64px 0" }}>
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Stack gap="42px" align="center">
          <Stack gap="16px">
            <Title text="create_title" textAlign="center" />
            <SubTitle text="create_subtitle" textAlign="center" />
          </Stack>

          <Flex gap="16px" flexWrap={wrap && "wrap"} justify={"center"}>
            <For each={instruction}>
              {({ id, title, description }) => (
                <Stack
                  key={id}
                  gap="16px"
                  w={{ base: "100%", md: "443px" }}
                  p="20px"
                  borderRadius={"5px"}
                  bg="#DEE4E680"
                >
                  <Text lineHeight={"24px"} fontSize={"16px"} fontWeight={500}>
                    {id}. {t(title)}
                  </Text>
                  <Text
                    lineHeight={"20px"}
                    fontSize={"12px"}
                    fontWeight={300}
                    color={"#4B5563"}
                  >
                    {t(description)}
                  </Text>
                </Stack>
              )}
            </For>
          </Flex>

          <Button
            w={{ base: "100%", md: "443px" }}
            h="52px"
            bg={"#004143"}
            color="white"
            fontWeight="400"
            lineHeight="24px"
            border="1px solid"
            borderColor="white"
            boxShadow="xl"
            _hover={{ bg: "white", color: "#004143", borderColor: "#004143" }}
            transition="all 0.3s ease"
            onClick={() => router.push(`/build/templates`)}
          >
            {t("start")}
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};
