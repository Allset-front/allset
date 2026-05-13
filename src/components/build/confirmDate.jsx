"use client";

import { Field, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { Calendar } from "@/components/build/calendar";
import { useTranslations } from "next-intl";
import { changeData } from "@/assets/svgs";

export const ConfirmDate = ({value}) => {
  const t = useTranslations();

  return (
    <Stack
      borderRadius={"8px"}
      bg="white"
      p={{ base: "16px", md: "24px" }}
      gap="16px"
    >
      <Field.Root gap="16px">
        <Field.Label gap="16px">
          <Label text="date_preview" />
        </Field.Label>

        <Text gap="8px" fontSize={"12px"} color={"#6B7280"}>
          {t("date_preview_rule")}
        </Text>
        {/* <SubText fs="14px" text="date_preview_rule" /> */}
        <Calendar value={value} disabled={true}/>
        <Text as={Flex} gap="8px" fontSize="14px" color={"#E1BD0B"}>
          <Icon>{changeData.icon}</Icon>
          {t("date_preview_rule2")}
        </Text>
      </Field.Root>
    </Stack>
  );
};
