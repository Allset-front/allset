"use client";

import {
  Flex,
  For,
  Icon,
  Image,
  Menu,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { languages } from "../../utils/constants";
import { useTranslations, useLocale } from "next-intl";
import { down } from "../../assets/svgs";
import cookies from "js-cookie";

export const Language = ({ bg, noMenu }) => {
  const t = useTranslations();
  const language = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const selected = languages.find(({ code }) => code === language);

  const handleChangeLng = (code) => {
    cookies.set("NEXT_LOCALE", code);

    startTransition(() => {
      router.replace(
        {
          pathname,
          query: Object.fromEntries(searchParams.entries()),
        },
        { locale: code },
      );
    });
  };

  if (noMenu) {
    return (
      <Flex gap="20px">
        <For each={languages}>
          {({ code, flag }) => {
            return (
              <Flex
                key={code}
                align="center"
                gap="8px"
                cursor="pointer"
                onClick={() => handleChangeLng(code)}
              >
                <Icon boxSize="24px" borderRadius="100%">
                  {flag.icon}
                </Icon>
                {t(code)}
              </Flex>
            );
          }}
        </For>
      </Flex>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Flex align="center" cursor="pointer">
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <Icon boxSize="24px" borderRadius="100%">
                {selected?.flag.icon}
              </Icon>
              <Icon size={"lg"}>{down.icon}</Icon>
            </>
          )}
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content w="auto" minW="unset" p="0" bg={bg}>
            <For each={languages.filter(({ code }) => code !== language)}>
              {({ code, flag }) => (
                <Menu.Item
                  key={code}
                  onClick={() => handleChangeLng(code)}
                  cursor="pointer"
                  _hover={{
                    bg: "#E5E7EB",
                  }}
                  px="12px"
                  py="8px"
                >
                  <Icon boxSize="24px" borderRadius="100%">
                    {flag.icon}
                  </Icon>
                  {t(code)}
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

// const currentPath = window.location.pathname;

// const pathParts = currentPath.split("/");
// pathParts[1] = code;

// const newPath = pathParts.join("/");
// navigate(newPath, { replace: true });
