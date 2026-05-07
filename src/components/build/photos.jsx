"use client";

import { useTranslations } from "next-intl";
import { Field, FileUpload, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { upload } from "../../assets/svgs";
import { Label } from "@/components/build/typography/label";
import { FileUploadList } from "@/components/build/filleUpload";
import { extractKeyFromUrl } from "@/utils/formatters";
import { InvitationStorageService } from "@/services/aws";

export const Photos = ({ name, value, onChange, count, required }) => {
  const t = useTranslations();

  const handleFileSelect = (files) => {
    onChange({
      target: {
        name,
        value: files ?? [],
      },
    });
  };

  const handleDeleteUrl = async (url) => {
    const key = extractKeyFromUrl(url);

    if (key) {
      try {
        await InvitationStorageService.delete(key);
      } catch (err) {
        console.error("AWS delete failed:", err);
      }
    }

    onChange({
      target: {
        name,
        value: (value ?? []).filter((img) => img !== url),
      },
    });
  };

  // const handleDeleteUrl = (url) => {
  //   onChange({
  //     target: {
  //       name,
  //       value: (value ?? []).filter((img) => img !== url),
  //     },
  //   });
  // };

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
        <FileUploadList
          value={value ?? []} // ✅ pass directly, no local state
          onFileSelect={handleFileSelect}
          onDeleteUrl={handleDeleteUrl}
        />
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
