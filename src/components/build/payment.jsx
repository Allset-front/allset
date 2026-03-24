"use client";

import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import {
  Button,
  Field,
  Flex,
  For,
  Icon,
  Image,
  Stack,
  Checkbox,
  Link as ChakraLink,
  Text,
  RadioGroup,
  HStack,
  Box,
} from "@chakra-ui/react";
import { checked, payment } from "../../assets/svgs";
import { Label } from "@/components/build/typography/label";
import { paymentMethods } from "../../utils/constants";
import { Link } from "@/i18n/routing";

export const Payment = () => {
  const t = useTranslations();

  const [pay, setPay] = useQueryState("payment_method");
  const [accept, setAccept] = useQueryState("terms_accepted");

  return (
    <Stack borderRadius={"8px"} bg="white" p="24px" gap={"16px"}>
      <Field.Root gap="24px">
        <Field.Label gap="16px">
          <Icon>{payment.icon}</Icon>
          <Label text="payment_method" />
        </Field.Label>

        <RadioGroup.Root value={pay} onValueChange={(e) => setPay(e.value)}>
          <HStack gap="16px">
            {paymentMethods.map(({ value, src }) => (
              <RadioGroup.Item
                key={value}
                value={value}
                cursor="pointer"
                gap="16px"
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <Flex
                  align={"center"}
                  justify={"center"}
                  w="165px"
                  h="72px"
                  bg="#F9FAFB"
                  br="4px"
                >
                  <Image src={src.src} alt="img" />
                </Flex>
                {/* <RadioGroup.ItemText>{value}</RadioGroup.ItemText> */}
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      </Field.Root>

      <Checkbox.Root
        size="sm"
        checked={accept}
        onCheckedChange={(e) => setAccept(!!e.checked)}
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
