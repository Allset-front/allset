"use client";

import React from "react";
import { Field, Input } from "@chakra-ui/react";
import { Label } from "../build/typography/label";

export const InputSimple = ({
  name,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  indicator = true,
}) => {
  return (
    <Field.Root required={required} gap={"16px"}>
      {indicator && (
        <Field.Label>
          <Field.RequiredIndicator fontSize="18px" />
          <Label text={placeholder} />
        </Field.Label>
      )}
      <Input
        name={`${name}`}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        variant="subtle"
        borderRadius={"4px"}
        bg="#F9FAFB"
        h="52px"
      />
    </Field.Root>
  );
};
