"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Flex,
  InputGroup,
  Input,
  Icon,
  useMediaQuery,
  IconButton,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { plus, search } from "@/assets/svgs";
import { Tooltip } from "@/components/ui/tooltip";
import { Add } from "./guests/add";
import { Filter } from "./guests/filter";

export const Actions = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  if (!pathname?.includes("invitations")) return;

  return (
    <Flex gap="21px" align={"center"}>
      {pathname?.includes("guests") && <Filter />}
      {isMobile ? (
        <Menu.Root positioning={{ placement: "left-start" }}>
          <Menu.Trigger asChild>
            <IconButton size={"lg"} variant={"ghost"}>
              {search.icon}
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content background="none" boxShadow="none" p="0">
                <Input
                  w={{ base: "100%", sm: "326px" }}
                  h="44px"
                  border={"1px solid"}
                  borderColor={"#C7D5D6"}
                  borderRadius={"34px"}
                  bg="#FFFFFF"
                  placeholder={t("search")}
                  _focus={{
                    outline: "none",
                  }}
                />
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <InputGroup startElement={<Icon>{search.icon}</Icon>}>
          <Input
            w="326px"
            h="44px"
            border={"1px solid"}
            borderColor={"#C7D5D6"}
            borderRadius={"34px"}
            bg="#FFFFFF"
            placeholder={t("search")}
          />
        </InputGroup>
      )}

      {pathname?.includes("guests") ? (
        <Add />
      ) : (
        <Tooltip
          ids={{ trigger: "add invitation" }}
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
      )}
    </Flex>
  );
};
