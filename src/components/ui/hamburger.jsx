"use client";

import React, { useEffect } from "react";
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
import { usePathname } from "@/i18n/routing";

export const Hamburger = ({ bg, children }) => {
  const pathname = usePathname();

  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    open && onClose();
  }, [pathname]);

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
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
