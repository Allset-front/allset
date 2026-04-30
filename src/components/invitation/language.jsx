"use client";

import { Box, Flex, For, Icon, Menu, Portal, Spinner } from "@chakra-ui/react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { languages } from "../../utils/constants";
import { useTranslations, useLocale } from "next-intl";
import { down } from "../../assets/svgs";
import cookies from "js-cookie";

export const Language = ({ locales }) => {
  const t = useTranslations();
  const language = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const availableLanguages = useMemo(
    () => languages.filter(({ code }) => locales.includes(code)),
    [locales],
  );

  const selectedLanguage = useMemo(
    () => availableLanguages.find(({ code }) => code === language),
    [availableLanguages, language],
  );

  const otherLanguages = useMemo(
    () => availableLanguages.filter(({ code }) => code !== language),
    [availableLanguages, language],
  );

  const handleChangeLng = useCallback(
    (code) => {
      if (code === language) return;

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
    },
    [language, pathname, router, searchParams],
  );

  return (
    <Box position="fixed" top="70px" right="10px" zIndex="100">
      <Menu.Root>
        <Menu.Trigger asChild>
          <Flex align="center" cursor="pointer">
            {isPending ? (
              <Spinner />
            ) : (
              <>
                {selectedLanguage?.flag?.icon && (
                  <Icon boxSize="24px" borderRadius="full">
                    {selectedLanguage.flag.icon}
                  </Icon>
                )}

                <Icon size="lg">{down.icon}</Icon>
              </>
            )}
          </Flex>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content w="auto" minW="unset" p="0">
              <For each={otherLanguages}>
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
    </Box>
  );
};
