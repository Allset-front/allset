"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Field, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Label } from "@/components/build/typography/label";
import { copied, copy } from "../../assets/svgs";
import { BASE_URL } from "@/lib/api/config";
import { error, success } from "../ui/alerts";

export const TitleDemo = () => {
  const t = useTranslations();

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = BASE_URL + ("es_du" ?? "");

  const handleCopy = async () => {
    if (isCopied) return info("URL is in clipboard!");

    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      success("URL copied successfully.");
    } catch (err) {
      error("Failed to copy: ", err);
    }
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root gap="12px">
        <Field.Label gap="16px">
          <Label text="invitation_url" />
        </Field.Label>

        {/* <Stack w="100%" gap="12px" pl="40px"> */}
        {/* <Input
            type="text"
            name="name"
            value={BASE_URL + "es_du"}
            variant="subtle"
            h="62px"
            border={"1px solid"}
            borderColor={"#D1D5DB"}
            borderRadius="8px"
            disabled={true}
          /> */}
        <Text gap="8px" fontSize={"12px"} color={"#6B7280"}>
          {t("not_active")}
        </Text>

        <Tooltip
          // ids={{ trigger: id }}
          positioning={{ placement: "top" }}
          content={isCopied ? t("copied") : t("copy")}
        >
          <Flex
            onClick={handleCopy}
            w="100%"
            justify="space-between"
            align="center"
            p="14px 16px"
            bg="#F9FAFB"
            border="1px solid"
            borderColor={isCopied ? "#0C6DE2" : "transparent"}
            borderRadius="4px"
            transition="all 0.3s ease"
            _focus={{ borderColor: "#0C6DE2" }}
            _hover={{ "& p": { textDecoration: "underline" } }}
            cursor="text"
          >
            <HStack spacing="10px">
              <Icon>{copy.icon}</Icon>
              <Text color="#0C6DE2" fontSize="14px" isTruncated>
                {fullUrl}
              </Text>
            </HStack>

            {isCopied && <Icon>{copied.icon}</Icon>}
          </Flex>
        </Tooltip>

        {/* </Stack> */}
      </Field.Root>
    </Stack>
  );
};
