"use client"

import { createSystem, defaultConfig, ChakraProvider } from "@chakra-ui/react";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-montserrat), sans-serif" },
        heading: { value: "var(--font-montserrat), sans-serif" },
      },
    },
  },
});

export function ChakraUIProvider({ children }) {
  return (
    <ChakraProvider value={system}>
    {/* <ChakraProvider value={defaultSystem}> */}
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
