"use client";

import React, { useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

export const Animate = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key="scroll-load"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      >
        {children}
      </MotionBox>
    </AnimatePresence>
  );
};
