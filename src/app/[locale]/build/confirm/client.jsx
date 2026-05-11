"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import apiClient from "@/lib/api";
import { Box, Stack } from "@chakra-ui/react";
import { error, success } from "@/components/ui/alerts";
import { Animate } from "@/components/ui/animate";
import { TitleDemo } from "@/components/build/titleDemo";
import { ConfirmDate } from "@/components/build/confirmDate";
import { Promocode } from "@/components/auth/profile/promocode";
import { Payment } from "@/components/build/payment";
import { Pay } from "@/components/build/pay";
import { Sucess } from "@/components/build/sucess";
import { Failed } from "@/components/build/failed";

export const ConfirmClient = () => {
  const router = useRouter();

  // const [status, setStatus] = useQueryState("status", {
  //   defaultValue: "",
  // });

  const [{ status }, setQuery] = useQueryStates({
    status: parseAsString,
    payment: parseAsString,
  });

  const [form, setForm] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
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

      {status === "success" && <Sucess status={status} setQuery={setQuery} />}
      {status === "failed" && <Failed status={status} setQuery={setQuery} />}
    </Box>
  );
};
