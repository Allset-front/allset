"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Field, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { BASE_URL } from "@/lib/api/config";
import { Label } from "@/components/build/typography/label";
import { cleanUrlExtension } from "../../utils/formatters";
import { copied, copy } from "@/assets/svgs";
import { Tooltip } from "../ui/tooltip";
import { Input } from "../ui/input";
import { error, info, success } from "../ui/alerts";

export const TitleCreator = ({
  name,
  value,
  onChange,
  setForm,
  required,
  languages,
}) => {
  const t = useTranslations();

  const [isCopied, setIsCopied] = useState(false);

  const fullUrl = BASE_URL + (value?.["en"] ?? "");

  const handleInputChange = (e, lng) => {
    const val = e.target.value;

    onChange(name, lng, val);

    if (lng === "en" && setForm) {
      setForm((prev) => ({
        ...prev,
        urlExtension: cleanUrlExtension(val),
      }));
    }

    lng == "en" && setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!value?.en) return error("Fill english title!");

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

      {/* <Flex borderRadius={"4px"} p="12px" bg="#F9FAFB">
        <Text textStyle="sm" color={"#6B7280"}>
          {t("invitation_preview")} {BASE_URL}
        </Text>
        <Text textStyle="sm" color={"#E85A6B"}>
          {cleanUrlExtension(value?.["en"]) ?? ""}
        </Text>
      </Flex> */}

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
