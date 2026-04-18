"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Field, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { Switcher } from "@/components/build/switcher";
import { InputSimple } from "../ui/inputSimple";

export const Contact = ({ name, value, onChange, hide, required }) => {
  const t = useTranslations();

  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (e) => {
    setChecked(e.checked);
    hide(name, !e.checked);
  };

  const handleNestedChange = (e) => {
    onChange({
      target: {
        name: name,
        value: {
          ...value,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root required={required} gap={"16px"}>
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          <HStack>
            <Field.RequiredIndicator />
            <Label text="contact" />
          </HStack>
          {!required && (
            <Switcher checked={checked} onChange={handleSwitchChange} />
          )}
        </Field.Label>
        
        <Text textStyle="xs" color={"#6B7280"}>
          {t("contact_text")}
        </Text>

        {checked && (
          <Flex
            w="100%"
            gap="16px"
            justify={"space-between"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputSimple
              name="name"
              value={value?.name ?? ""}
              onChange={handleNestedChange}
              placeholder={t("name")}
              // disabled={!checked}
            />
            <InputSimple
              name="phone"
              value={value?.phone ?? ""}
              onChange={handleNestedChange}
              placeholder={t("phone")}
              // disabled={!checked}
            />
            <InputSimple
              name="email"
              value={value?.email ?? ""}
              onChange={handleNestedChange}
              placeholder={t("email")}
              // disabled={!checked}
            />
          </Flex>
        )}
      </Field.Root>
    </Stack>
  );
};
