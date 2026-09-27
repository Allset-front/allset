"use client";

import { useTranslations } from "next-intl";
import {
  DataList,
  Field,
  Flex,
  Input,
  InputGroup,
  Separator,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { formatPrice } from "@/utils/formatters";
import { useState } from "react";
import { useMutateAuthTanstack } from "@/hooks/useTanstack";
import { error, success } from "../ui/alerts";

export const Promocode = ({ data }) => {
  const t = useTranslations();

  // Test data
  // const data = {
  //   basePrice: 3,
  //   finalPrice: 3,
  //   discountAmount: 0,
  //   promoCode: {
  //     code: "",
  //     discountType: "PERCENTAGE",
  //     discountValue: 0,
  //     expiresAt: null,
  //     appliedAt: "2026-06-02T11:57:15.209Z",
  //   },
  // };

  const { basePrice = 0, promoCode } = data || {};

  const [promocode, setPromocode] = useState(promoCode?.code || "");
  const [appliedPromo, setAppliedPromo] = useState(promoCode);

  const hasPromoCode = Boolean(appliedPromo?.code);

  const discountPercentage = hasPromoCode ? appliedPromo.discountValue : 0;

  const discountAmount = (basePrice * discountPercentage) / 100;

  const finalPrice = basePrice - discountAmount;

  const { mutate, isPending } = useMutateAuthTanstack(
    "promo-codes/apply",
    "post",
    {
      onSuccess: (res) => {
        setAppliedPromo(res);
        setPromocode(res.code);

        success(`Promocode applied! Discount is ${res.discountValue}%`);
      },
      onError: (err) =>
        error(err?.response?.data?.message || "Invalid promocode"),
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasPromoCode || !promocode.trim()) return;

    mutate({
      code: promocode.trim(),
    });
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      borderRadius="8px"
      bg="white"
      p={{ base: "16px", md: "24px" }}
    >
      <Field.Root gap="16px">
        <Flex w="100%" justify="space-between">
          <Field.Label gap="16px">
            <Label text="promocode" />
          </Field.Label>
        </Flex>

        <Flex w="100%" gap="16px">
          <InputGroup
            endElement={
              hasPromoCode && (
                <Text
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="24px"
                  color="#D80027"
                >
                  {discountPercentage}% OFF
                </Text>
              )
            }
          >
            <Input
              type="text"
              name="promocode"
              value={promocode}
              onChange={(e) => setPromocode(e.target.value)}
              variant="subtle"
              placeholder={t("promocode_placeholder")}
              bg="#F9FAFB"
              h="52px"
              disabled={hasPromoCode || isPending}
            />
          </InputGroup>

          {!hasPromoCode && (
            <Button
              type="submit"
              loading={isPending}
              fontWeight="400"
              lineHeight="24px"
              bg="#004143"
              w={{ base: "fit-content", md: "137px" }}
              h="52px"
              border="1px solid"
              borderColor="white"
              boxShadow="xl"
              _hover={{
                bg: "white",
                color: "#004143",
                borderColor: "#004143",
              }}
              transition="all 0.3s ease"
            >
              {t("apply")}
            </Button>
          )}
        </Flex>

        {hasPromoCode && (
          <DataList.Root w="100%" orientation="horizontal" gap="8px">
            <DataList.Item>
              <DataList.ItemLabel
                color="#4B5563"
                fontSize="14px"
                lineHeight="20px"
                fontWeight="400"
              >
                {t("original_price")}
              </DataList.ItemLabel>

              <DataList.ItemValue
                as="s"
                fontSize="14px"
                lineHeight="20px"
                justifyContent="flex-end"
              >
                {formatPrice(basePrice, t)}
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item>
              <DataList.ItemLabel
                color="#4B5563"
                fontSize="14px"
                lineHeight="20px"
                fontWeight="400"
              >
                {t("discount")} {discountPercentage}%
              </DataList.ItemLabel>

              <DataList.ItemValue
                fontSize="14px"
                lineHeight="20px"
                justifyContent="flex-end"
              >
                -{formatPrice(discountAmount, t)}
              </DataList.ItemValue>
            </DataList.Item>

            <Separator />

            <DataList.Item>
              <DataList.ItemLabel
                fontSize="14px"
                fontWeight="700"
                lineHeight="20px"
              >
                {t("final_price")}
              </DataList.ItemLabel>

              <DataList.ItemValue
                fontSize="14px"
                fontWeight="700"
                lineHeight="20px"
                justifyContent="flex-end"
              >
                {formatPrice(finalPrice, t)}
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        )}
      </Field.Root>
    </Stack>
  );
};
