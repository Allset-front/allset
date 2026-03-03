"use client";

import React from "react";
import { Stack, Container } from "@chakra-ui/react";
import { Title } from "./typography/title";
import { SubTitle } from "./typography/subTitle";
import { FeedbackSlide } from "./feedback_slide";

export const Feedback = ({ feedbacks }) => {
  return (
    <Stack p="40px 0 50px 0" bg="#0041431A">
      <Container maxW="1360px" px={0}>
        <Stack gap="20px">
          <Stack gap="8px">
            <Title text="feedback" color="#004143" />
            <SubTitle text="feedback_description" color="#004143" />
          </Stack>
          <FeedbackSlide feedbacks={feedbacks} />
        </Stack>
      </Container>
    </Stack>
  );
};
