"use client";

import React, { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useGetAuthTanstack, useMutateAuthTanstack } from "@/hooks/useTanstack";
import { queryClient } from "@/providers/queryProvider";
import {
  Button,
  Checkbox,
  CloseButton,
  Dialog,
  For,
  Icon,
  IconButton,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { error } from "@/components/ui/alerts";
import { checked, filter } from "@/assets/svgs";
import { useParams } from "next/navigation";
import { joinFilters } from "@/utils/formatters";

export const Filter = () => {
  const t = useTranslations();
  const locale = useLocale();
  const closeButtonRef = useRef(null);

  const [checkedFilters, setCheckedFilters] = useState([]);

  const { id } = useParams();
  const { data } = useGetAuthTanstack("confirmations/filters");

  const { mutate, isPending } = useMutateAuthTanstack(
    `confirmations/invitation/${id}?filterId=${joinFilters(checkedFilters)}`,
    "get",
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries({ queryKey: [`confirmations/invitation/${id}`] });
        queryClient.setQueryData([`confirmations/invitation/${id}`], data);
      },
      onError: (err) =>
        error(err?.response?.data?.error || "Filtration error!"),
    },
  );

  // V2
  const handleCheckboxChange = (id) => {
    setCheckedFilters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleFilter = (e) => {
    e.preventDefault();
    mutate();
    console.log("submit");
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <IconButton variant="ghost">{filter.icon}</IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{t("filter")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body as={Stack} gap="24px">
              <For each={data?.filters}>
                {(option) => (
                  <Checkbox.Root
                    key={option.id}
                    size="sm"
                    value={option.id}
                    checked={checkedFilters.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                      w="16px"
                      h="16px"
                      _checked={{ border: "none", bg: "transparent" }}
                      cursor="pointer"
                    >
                      {checkedFilters.includes(option.id) && (
                        <Icon>{checked.icon}</Icon>
                      )}
                    </Checkbox.Control>
                    <Checkbox.Label>{option.label[locale]}</Checkbox.Label>
                  </Checkbox.Root>
                )}
              </For>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                w="100%"
                h="52px"
                bg="#004143"
                borderRadius={"3px"}
                color="#FFFFFF"
                fontSize="16px"
                fontWeight="400"
                border="1px solid"
                borderColor="#FFFFFF"
                _hover={{
                  bg: "#FFFFFF",
                  color: "#004143",
                  borderColor: "#004143",
                  "& path": {
                    fill: "#004143",
                    transition: "all 0.3s ease",
                  },
                }}
                transition="all 0.3s ease"
                type="button"
                onClick={handleFilter}
              >
                {t("apply")}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" ref={closeButtonRef} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
