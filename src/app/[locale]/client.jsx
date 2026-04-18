"use client";

import React from "react";
import { useGetTanstack } from "@/hooks/useTanstack";
import { Box } from "@chakra-ui/react";
import { Animate } from "@/components/ui/animate";
import { Planning } from "@/components/public/planning";
import { Choose } from "@/components/public/choose";
import { isNotEmptyObject } from "@/utils/checkers";
import { Promo } from "@/components/public/promo";
import { Instruction } from "@/components/public/instruction";
import { Faqs } from "@/components/public/faqs";
import { Story } from "@/components/public/story";
import { Feedback } from "@/components/public/feedback";
import { Available } from "@/components/public/available";
import { Features } from "@/components/public/features";

export const HomeClient = () => {
  const { data } = useGetTanstack("home");

  return (
    <Box bg="#f6f6f7">
      <Animate>
        <Planning />
      </Animate>
      <Animate>
        <Choose />
      </Animate>
      {isNotEmptyObject(data?.promoBanner) && (
        <Animate>
          <Promo promo={data?.promoBanner} />
        </Animate>
      )}
      <Animate>
        <Instruction />
      </Animate>
      <Animate>
        <Feedback feedbacks={data?.feedbacks} />
      </Animate>
      <Animate>
        <Faqs faqs={data?.faq} />
      </Animate>
      <Animate>
        <Story />
      </Animate>
      <Animate>
        <Available />
      </Animate>
      <Animate>
        <Features />
      </Animate>
    </Box>
  );
};
