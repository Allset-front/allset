"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";

export function ChakraUIProvider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
