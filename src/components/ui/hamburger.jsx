"use client";

import React from "react";
import {
  IconButton,
  CloseButton,
  Drawer,
  Portal,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { burger } from "@/assets/svgs";

export const Hamburger = ({ bg, children }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Drawer.Root
      size="full"
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
    >
      <Drawer.Trigger asChild>
        <IconButton
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          _hover={{ bg: "gray.200" }}
          onClick={open ? onClose : onOpen}
        >
          {open ? <CloseButton pointerEvents="none" /> : burger.icon}
        </IconButton>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Positioner top="90px">
          <DrawerContent bg={bg}>
            <DrawerHeader />
            {/* <Drawer.CloseTrigger asChild>
                <CloseButton size="md" />
              </Drawer.CloseTrigger> */}
            {/* </DrawerHeader> */}
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
