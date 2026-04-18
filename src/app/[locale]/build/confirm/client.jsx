"use client";

import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import apiClient from "@/lib/api";
import { Box, Container, Stack } from "@chakra-ui/react";
import { error, success } from "@/components/ui/alerts";
import { Animate } from "@/components/ui/animate";
import { TitleDemo } from "@/components/build/titleDemo";
import { ConfirmDate } from "@/components/build/confirmDate";
import { Promocode } from "@/components/auth/profile/promocode";
import { Payment } from "@/components/build/payment";
import { Pay } from "@/components/build/pay";

export const ConfirmClient = () => {
  const router = useRouter();

  const [form, setForm] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      alert(159);
      const { data } = await apiClient.post(`/invitations`, form);

      if (data.status === "ok") {
        success("Basic Wedding Information Completed.");
        setForm();
        router.push(`/payment`);
      }
    } catch (err) {
      error(`Error - ${err}`);
    }
  };

  return (
    <Box pt={{ base: "32px", md: "48px" }} pb={{ base: "22px", md: "40px" }}>
      <Stack
        gap={{ base: "16px", md: "24px" }}
        w={{ base: "100%", lg: "748px" }}
        mx="auto"
      >
        <Stack
          id="confirm"
          as="form"
          gap={{ base: "16px", md: "24px" }}
          autoComplete="on"
          onSubmit={submit}
        >
          <Animate>
            <TitleDemo />
          </Animate>
          <Animate>
            <ConfirmDate />
          </Animate>
        </Stack>
        <Animate>
          <Promocode />
        </Animate>
        <Animate>
          <Payment />
        </Animate>
        <Animate>
          <Pay />
        </Animate>
      </Stack>
    </Box>
  );
};
