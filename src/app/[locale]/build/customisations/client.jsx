"use client";

import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useQueryState } from "nuqs";
import { useGetTanstack } from "@/hooks/useTanstack";
import { Animate } from "@/components/ui/animate";
import { Flex, Stack, useMediaQuery } from "@chakra-ui/react";
import { Aside } from "@/components/build/aside";
import { Preview } from "@/components/build/preview";
import { Title } from "@/components/build/typography/title";
import { SubTitle } from "@/components/build/typography/subTitle";

export const CustomisationsClient = () => {
  const router = useRouter();
  const language = useLocale();

  const { data } = useGetTanstack("templates");
  const [template] = useQueryState("template");
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  if (!template) {
    return router.push("/build/templates");
  }

  const selectedTemplate = data?.find((item) => item.id === template) || [];

  return (
    <Animate>
      {isMobile && (
        <Stack gap="16px" align={"center"} pt={{ base: "32px", md: "48px" }}>
          <Title text="choose_palette" />
          <SubTitle text="select_palette" />
        </Stack>
      )}

      <Flex
        position={"relative"}
        pt={{ base: "32px", md: "48px" }}
        pb="22px"
        gap={"24px"}
        flexDirection={{ base: "column-reverse", md: "row" }}
      >
        <Aside data={selectedTemplate?.palettes} language={language} />
        <Preview />
      </Flex>
    </Animate>
  );
};
