"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heading } from "@chakra-ui/react";

export const Title = ({ as, text, fontSize, color, textAlign }) => {
  const t = useTranslations();

  return (
    <Heading
      as={as ?? "h2"}
      lineHeight={{ base: "28px", md: "42px" }}
      fontWeight={"700"}
      fontSize={fontSize ?? { base: "28px", md: "32px" }}
      color={color ?? "#161E24"}
      textAlign={textAlign ?? "unset"}
      dangerouslySetInnerHTML={{ __html: t(text).replace(/\n/g, "<br />") }}
    />
  );
};
