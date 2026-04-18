"use client";

import React from "react";
import {
  InputGroup,
  Input as ChakraInput,
  Icon,
} from "@chakra-ui/react";
import { getFlagCode } from "@/utils/helpers";

export const Input = ({ languages, name, value, onChange, placeholder }) => {
  return languages?.map((lng) => (
    <InputGroup
      key={lng}
      startElement={
        <Icon boxSize="24px" borderRadius="100%">
          {getFlagCode(lng)?.icon}
        </Icon>
      }
    >
      <ChakraInput
        name={`${name}.${lng}`}
        value={value?.[lng] || ""}
        onChange={(e) => onChange(e, lng)}
        placeholder={placeholder}
        required
        // disabled={!lng}
        variant="subtle"
        borderRadius={"4px"}
        bg="#F9FAFB"
        h="52px"
      />
    </InputGroup>
  ));
};
