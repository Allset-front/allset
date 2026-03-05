"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Field, Input } from "@chakra-ui/react";

export const InputLabel = ({ label, name, value, onChange }) => {
  const t = useTranslations();

  return (
    // <Field.Root required>
    <Field.Root gap="12px">
      <Field.Label fontSize="12px" fontWeight="400" color="#6B7280">
        {t(label)} <Field.RequiredIndicator />
      </Field.Label>
      <Input
        name={`${name}`}
        value={value ?? ""}
        onChange={onChange}
        required
        variant="subtle"
        borderRadius={"4px"}
        bg="#F9FAFB"
        h="44px"
      />
    </Field.Root>
  );
};
