"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Flex, InputGroup, Input, Icon } from "@chakra-ui/react";
import { plus, search } from "@/assets/svgs";
import { Tooltip } from "@/components/ui/tooltip";

export const Actions = () => {
  const t = useTranslations()
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname?.includes("invitations")) return;

  return (
    <Flex gap="21px" align={"center"}>
      <InputGroup startElement={<Icon>{search.icon}</Icon>}>
        <Input
          w="326px"
          h="44px"
          border={"1px solid"}
          borderColor={"#C7D5D6"}
          borderRadius={"34px"}
          bg="#FFFFFF"
          placeholder="Search"
        />
      </InputGroup>

      <Tooltip
        // ids={{ trigger:  }}
        positioning={{ placement: "top" }}
        content={t("add")}
      >
        <Icon
          onClick={() => router.push("/build/templates")}
          cursor={"pointer"}
          _hover={{
            "& path": {
              fill: "#004143",
              transition: "all 0.3s ease",
            },
          }}
        >
          {plus.icon}
        </Icon>
      </Tooltip>
    </Flex>
  );
};
