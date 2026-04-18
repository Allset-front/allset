"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Stack, Container, Flex, Button } from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { Description } from "./typography/description";
import { PlanningSlide } from "./planning_slide";
import bg from "@/assets/imgs/planning_bg.png";

// TODO: 2 Containers to fix PC UI swiper issue!
export const Planning = () => {
  const t = useTranslations();
  const router = useRouter();
  
  return (
    <Stack p={{ base: "16px 0 100px 0", md: "80px 0 100px 0" }} bg="#f6f6f7">
      <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
        <Stack
          gap="100px"
          bgImage={`url(${bg.src})`}
          bgPos={{ base: "right 396px", md: "right 255px" }}
          bgRepeat={"no-repeat"}
          bgSize={{ base: "97px", md: "225px" }}
        >
          <Flex
            w="100%"
            align={"center"}
            // justify={{ base: "unset", md: "space-between" }}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "16px", md: "118px" }}
          >
            <Stack
              flex="1"
              gap={{ base: "16px", md: "24px" }}
              alignItems={{ base: "center", md: "unset" }}
            >
              <Title
                as="h1"
                fontSize={{ base: "26px", md: "42px" }}
                text="plan_title"
                color="#004143"
                textAlign={{ base: "center", md: "unset" }}
              />
              <SubTitle text="plan_subtitle" textAlign="right" />
            </Stack>

            <Stack
              w={{ base: "100%", xl: "537px" }}
              flex={{ base: 1, xl: "unset" }}
              alignItems={{ base: "center", md: "unset" }}
              gap="32px"
            >
              <Description
                text="plan_desc"
                textAlign={{ base: "center", md: "start" }}
              />
              <Button
                w={{ base: "100%", sm: "243px" }}
                h="52px"
                bg={"#004143"}
                color="white"
                fontWeight="400"
                lineHeight="24px"
                border="1px solid"
                borderColor="white"
                boxShadow="xl"
                _hover={{
                  bg: "white",
                  color: "#004143",
                  borderColor: "#004143",
                }}
                transition="all 0.3s ease"
                onClick={() => router.push(`/build/templates`)}
              >
                {t("start")}
              </Button>
            </Stack>
          </Flex>

          <Stack gap="27px" pt={"30px"}>
            <Stack gap="16px" align={"center"}>
              <Title text="plan_title_two" textAlign={"center"} />
              <Description text="plan_desc_two" />
            </Stack>

            <PlanningSlide />
          </Stack>

          <Flex
            w="100%"
            align={"center"}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "24px", md: "74px" }}
          >
            <Title
              text="plan_title_three"
              textAlign={{ base: "center", md: "unset" }}
            />
            <Description
              text="plan_desc_three"
              width={{ base: "fit-content", md: "690px" }}
              textAlign={{ base: "center", md: "start" }}
            />
          </Flex>
        </Stack>
      </Container>
    </Stack>
  );
};
