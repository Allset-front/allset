"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAuthTanstack, useMutateAuthTanstack } from "@/hooks/useTanstack";
import { queryClient } from "@/providers/queryProvider";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { Input } from "./input";
import { Radio } from "./radio";
import { Collection } from "./collection";
import { error, success } from "@/components/ui/alerts";

export const Edit = ({ id, guestId }) => {
  const t = useTranslations();
  const closeButtonRef = useRef(null);

  const { isLoading, data } = useGetAuthTanstack(`confirmations/${guestId}`);

  const { mutate } = useMutateAuthTanstack(
    `confirmations/${guestId}`,
    "patch",
    {
      onSuccess: () => {
        // guest data
        queryClient.invalidateQueries({
          queryKey: [`confirmations/${guestId}`],
        });
        // invitation by id,tables,stats
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.startsWith(`confirmations/invitation/${id}`),
        });
        success("Guest has been changed.");
      },
      onError: (err) =>
        error(err?.response?.data?.error || "Guest editing error!"),
    },
  );

  const [form, setForm] = useState({
    mainGuest: "",
    secondaryGuests: [],
    tableNumber: 0,
    guestSide: "",
  });
  // console.log(form);

  const handleOpen = () => {
    if (data) {
      setForm({
        mainGuest: data.mainGuest || "",
        secondaryGuests: data.secondaryGuests || [],
        tableNumber: data.tableNumber || 0,
        guestSide: data.guestSide || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecondaryGuestChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.secondaryGuests];
      updated[index] = value;

      return {
        ...prev,
        secondaryGuests: updated,
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    mutate(form);
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          w="100%"
          variant="plain"
          outline="none"
          _hover={{ bg: "#80A0A133" }}
          // loading={isLoading}
          disabled={isLoading}
          onClick={handleOpen}
        >
          {t("edit")}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{t("edit_guest")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body as={Stack} gap="24px">
              <Input
                label="guest_name"
                name="mainGuest"
                value={form.mainGuest}
                onChange={handleChange}
              />
              <For each={form.secondaryGuests}>
                {(el, idx) => (
                  <Input
                    key={idx}
                    label="accompanying_name"
                    value={el}
                    onChange={(e) =>
                      handleSecondaryGuestChange(idx, e.target.value)
                    }
                  />
                )}
              </For>
              <Radio
                value={form.guestSide}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, guestSide: value }))
                }
              />
              <Collection
                value={form.tableNumber}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, tableNumber: value }))
                }
              />
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
                onClick={handleSave}
              >
                {t("save")}
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
