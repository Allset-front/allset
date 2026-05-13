"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { Box, Stack } from "@chakra-ui/react";
import { error } from "@/components/ui/alerts";
import { Animate } from "@/components/ui/animate";
import { TitleDemo } from "@/components/build/titleDemo";
import { ConfirmDate } from "@/components/build/confirmDate";
import { Promocode } from "@/components/auth/profile/promocode";
import { Payment } from "@/components/build/payment";
import { Pay } from "@/components/build/pay";
import { Success } from "@/components/build/success";
import { Failed } from "@/components/build/failed";

export const ConfirmClient = () => {
  const [{ status, payment, id, legal }, setQuery] = useQueryStates({
    id: parseAsString,
    status: parseAsString,
    payment: parseAsString,
    legal: parseAsString,
  });

  const { data } = useGetAuthTanstack(`invitations/${id}`, !!id);

  const submit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await apiClient.post(`/invitations`, form);
      // if (data.status === "ok") {
      //   success("Basic Wedding Information Completed.");
      //   setForm();
      //   router.push(`/payment`);
      // }
      setQuery({ status: payment === "visa" ? "failed" : "success" });
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
            <TitleDemo
              language={data?.languages[0]}
              urlExtension={data?.urlExtension}
            />
          </Animate>
          <Animate>
            <ConfirmDate value={data?.eventDate} />
          </Animate>
        </Stack>
        <Animate>
          <Promocode />
        </Animate>
        <Animate>
          <Payment legal={legal} payment={payment} setQuery={setQuery} />
        </Animate>
        <Animate>
          <Pay />
        </Animate>
      </Stack>

      <Success
        open={status === "success"}
        setQuery={setQuery}
        language={data?.languages[0]}
        urlExtension={data?.urlExtension}
        price={data?.finalPrice}
      />
      <Failed
        open={status === "failed"}
        setQuery={setQuery}
        price={data?.finalPrice}
      />
    </Box>
  );
};
