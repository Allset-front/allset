"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  Flex,
  For,
  Input,
  Portal,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Radio } from "../auth/invitations/guests/radio";
import { isNotEmptyArray } from "@/utils/checkers";

export const Rsvp = ({
  isMobile,
  data,
  guestCount,
  form,
  setForm,
  guests,
  handleChange,
  handleGuestCountChange,
  handleConfirm,
  handleDecline,
}) => {
  const t = useTranslations();

  return (
    data !== false && (
      <VStack py={isMobile ? "40px" : "100px"} gap="37px">
        <Text
          fontSize={isMobile ? "20px" : "34px"}
          w="560px"
          fontWeight={500}
          lineHeight="48px"
          textAlign="center"
          textTransform="uppercase"
          color="var(--c-secondary)"
          // dangerouslySetInnerHTML={{
          //   __html: t("classic_join").replace(/\n/g, "<br />"),
          // }}
        >
          {t("classic_join")}
        </Text>
        <VStack gap="37px">
          <VStack gap="16px" minW={isMobile ? "100%" : "492px"}>
            <Input
              placeholder={t("classic_type")}
              h="52px"
              bg="white"
              variant="outline"
              //
              name="mainGuest"
              value={form.mainGuest}
              onChange={handleChange}
              color="var(--c-secondary)"
            />
            <Select.Root
              collection={guestCount}
              size="lg"
              width="100%"
              bg="white"
              variant="outline"
              value={guests}
              color="var(--c-secondary)"
              //
              // onValueChange={({ value }) => {
              //   const count = Number(value[0]) || 0;
              //   setForm((prev) => ({
              //     ...prev,
              //     secondaryGuests: Array.from(
              //       { length: count },
              //       (_, i) => prev.secondaryGuests[i] ?? "",
              //     ),
              //   }));
              // }}
              onValueChange={handleGuestCountChange}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={t("classic_count")} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {guestCount.items.map(({ label, value }) => (
                      <Select.Item item={value} key={value}>
                        {label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            {isNotEmptyArray(form.secondaryGuests) && (
              <For each={form.secondaryGuests}>
                {(el, idx) => (
                  <Input
                    key={idx}
                    value={el}
                    placeholder={t("accompanying_name")}
                    variant="outline"
                    h="52px"
                    bg="white"
                    color="var(--c-secondary)"
                    onChange={(e) =>
                      handleSecondaryGuestChange(idx, e.target.value)
                    }
                  />
                )}
              </For>
            )}

            <Radio
              color="var(--c-secondary)"
              value={form.guestSide}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, guestSide: value }))
              }
            />
            <Flex
              // minW={isMobile ? "100%" : "442px"}
              w="100%"
              gap="12px"
              justify={"space-between"}
            >
              <Button
                flex={1}
                h="44px"
                fontSize="14px"
                boxShadow="xl"
                bg="var(--c-secondary)"
                color="white"
                _hover={{
                  bg: "transparent",
                  color: "var(--c-secondary)",
                  borderColor: "var(--c-secondary)",
                }}
                transition="all 0.3s ease"
                onClick={handleConfirm}
              >
                {t("classic_accept")}
              </Button>
              <Button
                flex={1}
                variant="outline"
                border="1px solid"
                borderColor="var(--c-secondary)"
                h="44px"
                fontSize="14px"
                bg="transparent"
                color="var(--c-secondary)"
                _hover={{
                  bg: "var(--c-secondary)",
                  color: "white",
                  borderColor: "transparent",
                }}
                onClick={handleDecline}
              >
                {t("classic_reject")}
              </Button>
            </Flex>
          </VStack>
        </VStack>
      </VStack>
    )
  );
};
