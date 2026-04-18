"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
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
import { checked, filter } from "@/assets/svgs";
import { Tooltip } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { isEmptyArray } from "@/utils/checkers";

export const Filter = () => {
  const t = useTranslations();
  const language = useLocale();
  const closeButtonRef = useRef(null);

  const [filters, setFilters] = useQueryState("filters", {
    defaultValue: ["show_all_guests"],
  });
  const [tempFilters, setTempFilters] = useState([]);

  const { id } = useParams();
  const { data } = useGetAuthTanstack("confirmations/filters");
  const { data: guests } = useGetAuthTanstack(`confirmations/invitation/${id}`);

  useEffect(() => {
    if (Array.isArray(filters)) {
      setTempFilters(filters);
    } else if (typeof filters === "string") {
      setTempFilters(filters.split(",").filter(Boolean));
    } else {
      setTempFilters(["show_all_guests"]);
    }
  }, [filters]);

  // V2
  const handleCheckboxChange = (id) => {
    setTempFilters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  // V2
  const handleFilter = (e) => {
    e.preventDefault();
    setFilters(tempFilters);
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  if (isEmptyArray(guests)) {
    return;
  }

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Tooltip
        ids={{ trigger: "filter guests" }}
        positioning={{ placement: "top" }}
        content={t("filter")}
      >
        <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
          <IconButton variant="ghost">{filter.icon}</IconButton>
        </Dialog.Trigger>
      </Tooltip>
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
                    checked={tempFilters.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                      w="16px"
                      h="16px"
                      _checked={{ border: "none", bg: "transparent" }}
                      cursor="pointer"
                    >
                      {tempFilters.includes(option.id) && (
                        <Icon>{checked.icon}</Icon>
                      )}
                    </Checkbox.Control>
                    <Checkbox.Label>{option.label[language]}</Checkbox.Label>
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
