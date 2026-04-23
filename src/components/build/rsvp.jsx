"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Field, Flex, Stack, Text } from "@chakra-ui/react";
import { Label } from "./typography/label";
import { Switcher } from "./switcher";

export const Rsvp = ({ name, hide, onChange, text, value }) => {
  const t = useTranslations();

  const handleSwitchChange = (e) => {
    hide(name, !e.checked);
    onChange({ target: { name, value: e.checked } });
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root gap="16px">
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          {/* <HStack> */}
          <Field.RequiredIndicator fontSize="18px" />
          <Label text={text} />
          {/* </HStack> */}

          <Switcher checked={value} onChange={handleSwitchChange} />
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("rsvp_text")}
        </Text>
      </Field.Root>
    </Stack>
  );
};
