"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { useParams } from "next/navigation";
import { queryClient } from "@/providers/queryProvider";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Icon,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { Input } from "./input";
import { Radio } from "./radio";
import { error, success } from "@/components/ui/alerts";
import { add, plus, remove } from "@/assets/svgs";
import { Tooltip } from "@/components/ui/tooltip";
import { getInitialForm } from "@/utils/helpers";

export const Add = () => {
  const t = useTranslations();
  const closeButtonRef = useRef(null);

  const { id } = useParams();

  const { mutate } = useMutateAuthTanstack("confirmations/guest", "post", {
    onSuccess: () => {
      // invitation by id,tables,stats
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0]?.startsWith(`confirmations/invitation/${id}`),
      });
      if (closeButtonRef.current) closeButtonRef.current.click();
      setForm(getInitialForm(id));
      success("Guest list has been changed.");
    },
    onError: (err) =>
      error(err?.response?.data?.error || "Guest list adding error!"),
  });

  const [form, setForm] = useState(getInitialForm(id));

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

  const addSecondaryGuest = () => {
    setForm((prev) => ({
      ...prev,
      secondaryGuests: [...prev.secondaryGuests, ""],
    }));
  };

  const removeSecondaryGuest = (index) => {
    setForm((prev) => ({
      ...prev,
      secondaryGuests: prev.secondaryGuests.filter((_, i) => i !== index),
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.mainGuest) return error(t("add_guest"));
    if (!form.guestSide) return error(t("invitor"));

    mutate(form);
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom" as="form">
      <Tooltip
        ids={{ trigger: id }}
        positioning={{ placement: "top" }}
        content={t("add_guest")}
      >
        <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
          <Icon
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
        </Dialog.Trigger>
      </Tooltip>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{t("add_guest")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body as={Stack} gap="24px">
              <Input
                label="guest_name"
                name="mainGuest"
                value={form.mainGuest}
                onChange={handleChange}
              />
              {/* <For each={form.secondaryGuests}>
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
              </For> */}

              <For each={form.secondaryGuests}>
                {(el, idx) => (
                  <HStack key={idx} align="flex-end">
                    <Input
                      label="accompanying_name"
                      value={el}
                      onChange={(e) =>
                        handleSecondaryGuestChange(idx, e.target.value)
                      }
                    />

                    {form?.secondaryGuests?.length > 1 && (
                      <Button
                        h="44px"
                        variant="ghost"
                        onClick={() => removeSecondaryGuest(idx)}
                      >
                        {remove.icon}
                      </Button>
                    )}
                  </HStack>
                )}
              </For>

              <Button
                w="fit-content"
                variant="ghost"
                onClick={addSecondaryGuest}
              >
                {t("add_guest")} {add.icon}
              </Button>

              <Radio
                value={form.guestSide}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, guestSide: value }))
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
                onClick={handleAdd}
              >
                {t("add")}
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
