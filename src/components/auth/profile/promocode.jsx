"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMutateAuthTanstack } from "../../../hooks/useTanstack";
import {
  Button,
  DataList,
  Field,
  Flex,
  Input,
  InputGroup,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { error, success } from "@/components/ui/alerts";

export const Promocode = () => {
  const discount = 20;

  const t = useTranslations();

  const [promocode, setPromocode] = useState("");
  const [applied, setApplied] = useState(false);

  const { mutate, isPending } = useMutateAuthTanstack("promocode", "post", {
    onSuccess: (data) => success(`Aplied! Discount: ${data.discount}%`),
    onError: (err) => error(err?.response?.data?.error || "Invalid promocode"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied(true); // test case
    if (!promocode) return;
    mutate({ promocode });
  };

  return (
    <Stack
      borderRadius={"8px"}
      bg="white"
      p="24px"
      as="form"
      onSubmit={handleSubmit}
    >
      <Field.Root gap="16px">
        <Flex w="100%" justify={"space-between"}>
          <Field.Label gap="16px">
            <Label text="promocode" />
          </Field.Label>

          {/* {applied && !isPending && (
            <Text
              textStyle="sm"
              fontWeight={"500"}
              lineHeight={"28px"}
              color={"#16A34A"}
            >
              Aplied
            </Text>
          )} */}
        </Flex>

        <Flex w="100%" gap="16px">
          <InputGroup
            endElement={
              applied &&
              !isPending && (
                <Text
                  fontSize={"14px"}
                  fontWeight={"700"}
                  lineHeight={"24px"}
                  color={"#D80027"}
                >
                  {discount}% OFF
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
              disabled={isPending}
              bg="#F9FAFB"
              h="52px"
            />
          </InputGroup>
          <Button
            type="submit"
            fontWeight="400"
            lineHeight="24px"
            bg="#004143"
            w="137px"
            h="52px"
            border="1px solid"
            borderColor="white"
            boxShadow="xl"
            _hover={{ bg: "white", color: "#004143", borderColor: "#004143" }}
            transition="all 0.3s ease"
            loading={isPending}
          >
            {t("apply")}
          </Button>
        </Flex>
        {applied && !isPending && (
          <DataList.Root w="100%" orientation="horizontal" gap="8px">
            <DataList.Item>
              <DataList.ItemLabel
                color={"#4B5563"}
                fontSize={"14px"}
                lineHeight={"20px"}
                fontWeight={"400"}
              >
                {t("original_price")}
              </DataList.ItemLabel>
              <DataList.ItemValue
                as="s"
                fontSize={"14px"}
                lineHeight={"20px"}
                justifyContent={"flex-end"}
              >
                $49.99
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel
                color={"#4B5563"}
                fontSize={"14px"}
                lineHeight={"20px"}
                fontWeight={"400"}
              >
                {t("discount")} ({discount}%):
              </DataList.ItemLabel>
              <DataList.ItemValue
                fontSize={"14px"}
                lineHeight={"20px"}
                justifyContent={"flex-end"}
              >
                -$10.00
              </DataList.ItemValue>
            </DataList.Item>
            <Separator />
            <DataList.Item w="100%">
              <DataList.ItemLabel
                fontSize={"14px"}
                fontWeight={"700"}
                lineHeight={"20px"}
              >
                {t("final_price")}
              </DataList.ItemLabel>
              <DataList.ItemValue
                fontSize={"14px"}
                fontWeight={"700"}
                lineHeight={"20px"}
                justifyContent={"flex-end"}
              >
                $39.99
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        )}
      </Field.Root>
    </Stack>
  );
};
