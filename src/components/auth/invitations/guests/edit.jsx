"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button, CloseButton, Dialog, Portal, Stack } from "@chakra-ui/react";
import { InputLabel } from "./inputLabel";
import { useGetAuthTanstack } from "@/hooks/useTanstack";

export const Edit = ({ guestID }) => {
  const t = useTranslations();
  const { id } = useParams();

  //   const { isLoading, data } = useGetAuthTanstack(
  //     `confirmations/invitation/${id}?filterId=${guestID}`,
  //   );
  // console.log("filtered_guest",data);

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          w="100%"
          variant="plain"
          outline="none"
          _hover={{ bg: "#80A0A133" }}
        >
          Edit
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onClick={(e) => e.stopPropagation()}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{t("edit_guest")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body
              as={Stack}
              gap="24px"
            >
              <InputLabel label="guest_name" name="name" value onChange />
              <InputLabel label="accompanying_name" name="" value onChange />
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
              >
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
