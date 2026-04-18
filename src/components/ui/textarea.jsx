"use client";

import React from "react";
import { Textarea, Image, Box, Icon } from "@chakra-ui/react";
import { getFlagCode } from "@/utils/helpers";

export const TextArea = ({
  languages,
  name,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return languages?.map((lng) => (
    <Box key={lng} position="relative" w="100%">
      <Icon
        boxSize="24px"
        borderRadius="100%"
        position="absolute"
        top="15px"
        left="10px"
        zIndex={1}
      >
        {getFlagCode(lng)?.icon}
      </Icon>
      <Textarea
        name={`${name}.${lng}`}
        value={value?.[lng] || ""}
        onChange={(e) => onChange(e, lng)}
        placeholder={placeholder}
        required
        // disabled={!lng}
        disabled={disabled}
        variant="subtle"
        borderRadius={"4px"}
        bg="#F9FAFB"
        h={name === "closingText" ? "66px" : "120px"}
        resize={"none"}
        pt="15px"
        pl="40px"
      />
    </Box>
  ));
};
