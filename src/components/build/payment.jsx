"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import {
  Field,
  Flex,
  Icon,
  Image,
  Stack,
  Checkbox,
  Link as ChakraLink,
  RadioGroup,
  HStack,
  Text,
} from "@chakra-ui/react";
import { checked, pay } from "../../assets/svgs";
import { Label } from "@/components/build/typography/label";
import { paymentMethods } from "../../utils/constants";
import { Link } from "@/i18n/routing";

export const Payment = () => {
  const t = useTranslations();

  const [{ accept, payment }, setQuery] = useQueryStates({
    accept: parseAsString,
    payment: parseAsString,
  });

  return (
    <Stack
      bg="white"
      borderRadius={"8px"}
      p={{ base: "16px", md: "24px" }}
      gap={"16px"}
    >
      <Field.Root gap={{ base: "16px", md: "24px" }}>
        <Field.Label gap="16px">
          <Icon>{pay.icon}</Icon>
          <Label text="payment_method" />
        </Field.Label>

        <Text gap="8px" fontSize={"12px"} color={"#6B7280"}>
          {t("payment_method_text")}
        </Text>

        <RadioGroup.Root
          value={payment}
          onValueChange={(e) => setQuery({ payment: e.value })}
        >
          <HStack gap={{ base: "10px", md: "16px" }}>
            {paymentMethods.map(({ value, src }) => (
              <RadioGroup.Item
                key={value}
                value={value}
                cursor="pointer"
                gap={{ base: "10px", md: "16px" }}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <Flex
                  align={"center"}
                  justify={"center"}
                  flexDirection={"column"}
                  gap="10px"
                  w={{ base: "116px", md: "165px" }}
                  h="72px"
                  bg="#F9FAFB"
                  br="4px"
                  p="16px"
                >
                  {value == "visa" && (
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      color={"#4B5563"}
                      lineHeight={"18px"}
                    >
                      Credit Card
                    </Text>
                  )}
                  <Image
                    src={src.src}
                    alt="img"
                    w={value === "visa" ? "63px" : "100%"}
                  />
                </Flex>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      </Field.Root>

      <Checkbox.Root
        size="sm"
        checked={accept}
        onCheckedChange={(e) => setQuery({ accept: !!e.checked })}
        // onCheckedChange={handleChange}
        alignItems="start"
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control
          w="16px"
          h="16px"
          _checked={{ border: "none", bg: "transparent" }}
          cursor={"pointer"}
        >
          {accept && <Icon>{checked.icon}</Icon>}
        </Checkbox.Control>
        <Checkbox.Label
          fontSize={"12px"}
          lineHeight={"18px"}
          fontWeight={"400"}
          pl={"8px"}
        >
          {t("legal_agree")}{" "}
          <ChakraLink
            as={Link}
            color={"#004143"}
            fontWeight={"600"}
            target="_blank"
            href={`/policies/terms-conditions`}
          >
            {t("terms_conditions")}
          </ChakraLink>{" "}
          {t("and")}
          <ChakraLink
            as={Link}
            color={"#004143"}
            fontWeight={"600"}
            target="_blank"
            href={`/policies/privacy-policy`}
          >
            {t("privacy_policy")}
          </ChakraLink>{" "}
          {t("legal_understand")}
        </Checkbox.Label>
      </Checkbox.Root>
    </Stack>
  );
};
