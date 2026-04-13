"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Checkbox, Field, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { Switcher } from "@/components/build/switcher";
import { checked } from "../../assets/svgs";
import { InputUrl } from "../ui/inputUrl";
import { InputTime } from "../ui/inputTime";
import { AddAgenda } from "./addAgenda";

export const Timeline = ({
  data,
  setData,
  languages,
  name,
  value,
  hide,
  onChange,
  required,
}) => {
  const t = useTranslations();
  const language = useLocale();
  // console.log(data);

  const [disabled, setDisabled] = useState(true);

  const handleSwitchChange = (e) => {
    setDisabled(e.checked);
    hide(name, !e.checked);
  };

  const getItem = (venueKey) =>
    value?.find((item) => item.venueKey === venueKey);

  const handleCheckboxChange = (venueKey, isChecked, venueName) => {
    let newTimeline = [...value];

    if (isChecked) {
      if (!newTimeline?.find((item) => item.venueKey === venueKey)) {
        newTimeline.push({
          venueKey,
          venueName,
          time: "",
          venueLocation: "",
        });
      }
    } else {
      newTimeline = newTimeline.filter((item) => item.venueKey !== venueKey);
    }

    onChange(newTimeline);
  };

  const handleInputChange = (venueKey, field, val) => {
    const newTimeline = value.map((item) =>
      item.venueKey === venueKey ? { ...item, [field]: val } : item,
    );
    onChange(newTimeline);
  };

  return (
    <Stack
      borderRadius="8px"
      bg="white"
      p={{ base: "16px", md: "24px" }}
      gap="16px"
    >
      <Field.Root required={required} gap="16px">
        <Field.Label as={Flex} w="100%" justify="space-between">
          <Label text="agenda" />
          {!required && (
            <Switcher checked={disabled} onChange={handleSwitchChange} />
          )}
        </Field.Label>
        <Text textStyle="xs" color={"#6B7280"}>
          {t("agenda_text")}
        </Text>
      </Field.Root>

      {disabled && (
        <>
          {Object.entries(data || {}).map(([venueKey, venueName]) => {
            const item = getItem(venueKey);
            const isChecked = !!item;

            return (
              <Checkbox.Root
                key={venueKey}
                checked={isChecked}
                onCheckedChange={(e) =>
                  handleCheckboxChange(
                    venueKey,
                    e.checked === true,
                    venueName[language] || venueName.en,
                  )
                }
                w="100%"
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "unset" }}
                cursor="pointer"
                p="16px 0"
                borderRadius="4px"
                disabled={!disabled}
                borderBottom="2px solid"
                borderColor="#F9FAFB"
              >
                <Flex align="center" gap="12px">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control
                    w={{ base: "16px", md: "24px" }}
                    h={{ base: "16px", md: "24px" }}
                    _checked={{ border: "none", bg: "transparent" }}
                  >
                    {isChecked && <Icon>{checked.icon}</Icon>}
                  </Checkbox.Control>
                  <Checkbox.Label
                    as={Flex}
                    gap={"8px"}
                    alignItems={"center"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    lineHeight={"24px"}
                  >
                    {/* <Icon>{icon.icon}</Icon> */}
                    {venueName[language] || venueName.en}
                  </Checkbox.Label>
                </Flex>

                <Flex gap="32px">
                  <InputTime
                    value={item?.time}
                    onChange={(e) =>
                      handleInputChange(venueKey, "time", e.target.value)
                    }
                    disabled={!isChecked}
                  />
                  <InputUrl
                    name="venueLocation"
                    value={item?.venueLocation}
                    onChange={(e) =>
                      handleInputChange(venueKey, e.target.name, e.target.value)
                    }
                    placeholder={t("location")}
                    disabled={!isChecked}
                  />
                </Flex>
              </Checkbox.Root>
            );
          })}

          <AddAgenda setData={setData} languages={languages} />
        </>
      )}
    </Stack>
  );
};
