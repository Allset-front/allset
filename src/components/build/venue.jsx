"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Field, Stack, Text } from "@chakra-ui/react";
import { Label } from "./typography/label";
import { InputSimple } from "../ui/inputSimple";
import { InputUrl } from "../ui/inputUrl";

export const Venue = ({ name, value, onChange, required }) => {
  const t = useTranslations();

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
        <Field.Label>
          <Field.RequiredIndicator fontSize="18px" />
          <Label text="venue" />
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("venue_text")}
        </Text>
        <InputSimple
          name="location"
          value={value?.location ?? ""}
          onChange={handleNestedChange}
          placeholder={t("venue_location")}
        />
        <InputUrl
          name="link"
          value={value?.link ?? ""}
          onChange={handleNestedChange}
          placeholder={t("venue_link")}
        />
      </Field.Root>
    </Stack>
  );
};
