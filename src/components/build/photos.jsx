"use client";

import { useTranslations } from "next-intl";
import { Field, FileUpload, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { upload } from "../../assets/svgs";
import { Label } from "@/components/build/typography/label";
import { FileUploadList } from "@/components/build/filleUpload";

export const Photos = ({ name, onChange, required, count }) => {
  const t = useTranslations();

  const handleFileSelect = (files) => {
    onChange({
      target: {
        name,
        value: files ?? [],
      },
    });
  };

  return (
    <Stack
      borderRadius={"8px"}
      bg="white"
      p={{ base: "16px", md: "24px" }}
      gap="16px"
    >
      <Field.Root required={required} gap={"16px"}>
        <Field.Label>
          <Field.RequiredIndicator />
          <Label text="photos_main" />
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("photos_main_text")}
        </Text>
      </Field.Root>
      <FileUpload.Root
        accept="image/*"
        maxFiles={count}
        as={Flex}
        gap="16px"
        flexDirection="row"
        flexWrap="wrap"
      >
        <FileUploadList onFileSelect={handleFileSelect} />
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone
          minW="163px"
          maxW="163px"
          minH="178px"
          background="#F9FAFB"
        >
          <Icon>{upload.icon}</Icon>
          <FileUpload.DropzoneContent>
            <Text textStyle="md">{t("or")}</Text>
            <Text textStyle="md">{t("photos_rule")}</Text>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
      </FileUpload.Root>
    </Stack>
  );
};
