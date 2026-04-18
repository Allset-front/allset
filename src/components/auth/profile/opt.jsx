"use client";

import React, { useState } from "react";
import { checked } from "@/assets/svgs";
import { Checkbox, Icon } from "@chakra-ui/react";
import { cookie } from "@/lib/browser/cookie";

export const Opt = () => {
  const [accept, setAccept] = useState(cookie.get("opt") === "true");

  const handleChange = () => {
    setAccept(!accept);
    cookie.set("opt", String(!accept));
  };
  
  return (
    <Checkbox.Root
      size="sm"
      checked={accept}
      onCheckedChange={handleChange}
      alignItems="start"
      justifyContent="center"
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control
        w="16px"
        h="16px"
        _checked={{ border: "none", bg: "transparent" }}
        cursor={"pointer"}
      >
        {accept && <Icon>{checked.icon}</Icon>}
      </Checkbox.Control>
      <Checkbox.Label
        fontSize={"12px"}
        lineHeight={"18px"}
        fontWeight={"400"}
        pl={"8px"}
      >
        {/* {t("legal_agree")} */}
        Opt-in for Marketing Updates. Get early access to new templates,
        features, vendor promos.
      </Checkbox.Label>
    </Checkbox.Root>
  );
};
