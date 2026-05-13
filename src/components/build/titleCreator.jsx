"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Field, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { BASE_URL } from "@/lib/api/config";
import { Label } from "@/components/build/typography/label";
import { copied, copy } from "@/assets/svgs";
import { Tooltip } from "../ui/tooltip";
import { Input } from "../ui/input";
import { error, info, success } from "../ui/alerts";

export const TitleCreator = ({
  name,
  value,
  urlExtension,
  onChange,
  required,
  languages,
}) => {
  const t = useTranslations();

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = `${BASE_URL}${languages?.[0]}/invitation/${urlExtension ?? ""}`;

  const handleInputChange = (e, lng) => {
    const val = e.target.value;

    onChange(name, lng, val);

    lng == "en" && setIsCopied(false);
  };

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
    <Stack
      borderRadius={"8px"}
      bg="white"
      p={{ base: "16px", md: "24px" }}
      gap={"16px"}
    >
      <Field.Root required={required} gap={"16px"}>
        <Field.Label>
          <Field.RequiredIndicator fontSize="18px" />
          <Label text="invitation_title" />
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("invitation_text")}
        </Text>
        <Input
          languages={languages}
          name={name}
          value={value ?? ""}
          onChange={handleInputChange}
          placeholder={t("invitation_placeholder")}
        />
      </Field.Root>

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
    </Stack>
  );
};
