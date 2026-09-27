"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { useGetAuthTanstack, useMutateAuthTanstack } from "@/hooks/useTanstack";
import { Box, Center, Spinner, Stack } from "@chakra-ui/react";
import { error } from "@/components/ui/alerts";
import { Animate } from "@/components/ui/animate";
import { TitleDemo } from "@/components/build/titleDemo";
import { ConfirmDate } from "@/components/build/confirmDate";
import { Promocode } from "@/components/build/promocode";
import { Payment } from "@/components/build/payment";
import { Pay } from "@/components/build/pay";
import { Success } from "@/components/build/success";
import { Failed } from "@/components/build/failed";
import { cookie } from "@/lib/browser/cookie";
import { queryClient } from "@/providers/queryProvider";

export const ConfirmClient = () => {
  const [{ template, palette, status, payment, id, legal }, setQuery] =
    useQueryStates({
      template: parseAsString.withDefault(null),
      palette: parseAsString.withDefault(null),
      id: parseAsString.withDefault(null),
      payment: parseAsString.withDefault(null),
      legal: parseAsString.withDefault(null),
      status: parseAsString.withDefault(null),
    });

  const { isLoading, data } = useGetAuthTanstack(`invitations/${id}`, !!id);

  const { mutate: idramMutate } = useMutateAuthTanstack(
    "payments/idram/initiate",
    "post",
    {
      onSuccess: (result) => {
        const {
          actionUrl,
          edpLanguage,
          edpRecAccount,
          edpDescription,
          edpAmount,
          edpBillNo,
        } = result;

        const form = document.createElement("form");
        form.method = "POST";
        form.action = actionUrl;

        const fields = {
          EDP_LANGUAGE: edpLanguage,
          EDP_REC_ACCOUNT: edpRecAccount,
          EDP_DESCRIPTION: edpDescription,
          EDP_AMOUNT: edpAmount,
          EDP_BILL_NO: edpBillNo,
        };

        Object.entries(fields).forEach(([name, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      },
      onError: (err) => {
        error(err?.response?.data?.message);
      },
    },
  );

  const { mutate: arcaMutate } = useMutateAuthTanstack(
    "payments/arca/initiate",
    "post",
    {
      onSuccess: (result) => {
        const { formUrl, orderId } = result;

        if (orderId && formUrl) {
          window.location.href = formUrl;
        }
      },
      onError: (err) => {
        error(err?.response?.data?.message);
      },
    },
  );

  const submit = (e) => {
    e.preventDefault();

    queryClient.invalidateQueries({ queryKey: [`invitations/drafts`] });

    if (payment === "idram") {
      cookie.set(
        "redirect",
        `?template=${template}&palette=${palette}&id=${id}&legal=true&payment=${payment}`,
      );
      return idramMutate({ invitationId: id });
    }

    return arcaMutate({ invitationId: id });
  };

  if (!id || isLoading || !data) {
    return (
      <Center pt="40px">
        <Spinner size="xl" color="#004143" />
      </Center>
    );
  }

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
          <Promocode data={data?.pricing} />
        </Animate>
        <Animate>
          <Payment legal={legal} payment={payment} setQuery={setQuery} />
        </Animate>
        <Pay onSubmit={submit} />
      </Stack>
      <Success open={status === "success"} data={data} setQuery={setQuery} />
      <Failed
        open={status === "failed"}
        setQuery={setQuery}
        price={data?.pricing?.finalPrice}
      />
    </Box>
  );
};
