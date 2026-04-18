"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Field, FileUpload, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { upload } from "../../assets/svgs";
import { Label } from "@/components/build/typography/label";
import { FileUploadList } from "@/components/build/filleUpload";
import { Switcher } from "@/components/build/switcher";
import { TextArea } from "../ui/textarea";

export const Story = ({
  name,
  value,
  onChange,
  hide,
  required,
  languages,
  count,
}) => {
  const t = useTranslations();

  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (e) => {
    setChecked(e.checked);
    hide(name, !e.checked);
  };

  // const handleNestedChange = (e, lang) => {
  //   onChange({
  //     target: {
  //       name: name,
  //       value: {
  //         ...value,
  //         text: {
  //           ...value?.text,
  //           [lang]: e.target.value,
  //         },
  //       },
  //     },
  //   });
  // };

  const handleInputChange = (e, lng) => {
    onChange(name, lng, e.target.value, "text");
  };

  const handleFileSelect = (files) => {
    onChange({
      target: {
        name,
        value: {
          ...value,
          photoUrls: files,
        },
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
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          <Flex>
            <Field.RequiredIndicator fontSize="18px" />
            <Label text="story" />
          </Flex>

          {!required && (
            <Switcher checked={checked} onChange={handleSwitchChange} />
          )}
        </Field.Label>

        <Text textStyle="xs" color={"#6B7280"}>
          {t("story_text")}
        </Text>

        {checked && (
          <TextArea
            languages={languages}
            name={name}
            value={value?.text}
            onChange={handleInputChange}
            placeholder={t("story_placeholder")}
            // disabled={!checked}
          />
        )}
      </Field.Root>

      {checked && (
        <FileUpload.Root
          accept="image/*"
          maxFiles={count}
          // disabled={!checked}
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
            cursor={!checked && "not-allowed"}
          >
            <Icon>{upload.icon}</Icon>
            <FileUpload.DropzoneContent>
              <Text textStyle="md">{t("or")}</Text>
              <Text textStyle="md">{t("photos_rule")}</Text>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
        </FileUpload.Root>
      )}
    </Stack>
  );
};

{
  /* <Textarea
  h="114px"
  resize={"none"}
  name="text"
  value={value?.text?.[activeLang] ?? ""}
  onChange={(e) => handleNestedChange(e, activeLang)}
  disabled={!checked || !activeLang}
  placeholder={t("story_placeholder")}
/>; */
}
