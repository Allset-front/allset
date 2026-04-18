"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Field, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
// import { xls } from "../../assets/svgs";
import { Switcher } from "@/components/build/switcher";
import { TextArea } from "../ui/textarea";

export const TextAreaField = ({
  name,
  value,
  onChange,
  hide,
  required,
  text,
  placeholder,
  languages,
}) => {
  const t = useTranslations();

  const [checked, setChecked] = useState(true);

  const handleInputChange = (e, lng) => {
    onChange(name, lng, e.target.value);
  };

  const handleSwitchChange = (e) => {
    setChecked(e.checked);
    hide(name, !e.checked);
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root required={required} gap={"16px"}>
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          <HStack>
            <Field.RequiredIndicator fontSize="18px" />
            <Label text={text} />
          </HStack>

          {!required && (
            <Switcher checked={checked} onChange={handleSwitchChange} />
          )}
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("description_text")}
        </Text>
        <TextArea
          languages={languages}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={t(placeholder)}
        />
      </Field.Root>
    </Stack>
  );
};
