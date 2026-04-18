"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  Icon,
  Input,
  InputGroup,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { add } from "@/assets/svgs";
import { getFlagCode } from "@/utils/helpers";
import { generateAgendaKey } from "@/utils/formatters";
import { error } from "../ui/alerts";

export const AddAgenda = ({ setData, languages }) => {
  const t = useTranslations();
  const [values, setValues] = useState({});

  const handleInputChange = (language, newValue) => {
    setValues((prev) => ({
      ...prev,
      [language]: newValue,
    }));
  };

  const handleAdd = () => {
    const enValue = values.en?.trim();
    if (!enValue) {
      return error("You need to add English");
    }

    const key = generateAgendaKey(enValue);
    const newAgenda = {
      [key]: languages.reduce(
        (acc, lang) => ({
          ...acc,
          [lang]: values[lang] || "",
        }),
        {},
      ),
    };

    setData((prev) => ({
      ...prev,
      ...newAgenda,
    }));

    setValues({});
  };

  return (
    <Dialog.Root placement={"center"}>
      <Tooltip
        ids={{ trigger: "add agenda" }}
        positioning={{ placement: "top" }}
        content={t("add_agenda_text")}
      >
        <Dialog.Trigger asChild>
          <Button variant="ghost" width={"fit-content"} color={"#004143"}>
            {t("add_variant")}
            <Icon>{add.icon}</Icon>
          </Button>
        </Dialog.Trigger>
      </Tooltip>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack>
                <Dialog.Title
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="18px"
                >
                  {t("add_variant")}
                </Dialog.Title>
                <Text textStyle="xs" color={"#6B7280"}>
                  {t("add_agenda")}
                </Text>
              </Stack>
            </Dialog.Header>
            <Dialog.Body as={Stack} gap="16px" m="16px 0">
              <For each={languages}>
                {(el) => (
                  <InputGroup
                    key={el}
                    startElement={
                      <Icon boxSize="24px" borderRadius="100%">
                        {getFlagCode(el)?.icon}
                      </Icon>
                    }
                  >
                    <Input
                      name={el}
                      value={values[el] || ""}
                      onChange={(e) => handleInputChange(el, e.target.value)}
                      placeholder={t("agenda")}
                      required={true}
                      variant="subtle"
                      borderRadius={"4px"}
                      bg="#F9FAFB"
                      h="52px"
                    />
                  </InputGroup>
                )}
              </For>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={handleAdd}
                  w="100%"
                  border="1px solid"
                  borderColor="#4B5563"
                  bg={"#004143"}
                  color="white"
                  fontWeight="400"
                  lineHeight="24px"
                  _hover={{ bg: "white", color: "#004143" }}
                >
                  {t("add")}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
