"use client";

import { useLocale, useTranslations } from "next-intl";
import { useGetTanstack } from "@/hooks/useTanstack";
import { useState } from "react";
import {
  Box,
  Field,
  Flex,
  For,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { Switcher } from "@/components/build/switcher";
import { TextArea } from "../ui/textarea";

export const Dresscode = ({
  name,
  value,
  onChange,
  hide,
  required,
  languages,
}) => {
  const t = useTranslations();
  const language = useLocale();

  const { data } = useGetTanstack("color-palettes");
  // console.log(data);

  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState(null);

  const handleSwitchChange = (e) => {
    setChecked(e.checked);
    hide(name, !e.checked);
    selected && setSelected(null);
  };

  const handleInputChange = (e, lng) => {
    onChange(name, lng, e.target.value, "description");
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root required={required} gap={"16px"}>
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          {/* <HStack> */}
          <Field.RequiredIndicator fontSize="18px" />
          <Label text="dresscode" />
          {/* </HStack> */}

          {!required && (
            <Switcher checked={checked} onChange={handleSwitchChange} />
          )}
        </Field.Label>

        <Text textStyle="xs" color={"#6B7280"}>
          {t("dresscode_text")}
        </Text>

        {checked && (
          <>
            <Flex gap={"16px"} flexWrap={"wrap"}>
              {data?.map((item) => {
                const isSelected = selected === item.id;

                return (
                  <Box
                    key={item.id}
                    border="1px solid"
                    borderColor={isSelected ? "#0041434D" : "transparent"}
                    boxShadow={
                      isSelected && "0px 4px 10px 0px rgba(0, 65, 67, 0.1)"
                    }
                    borderRadius="8px"
                    bg="#F9FAFB"
                    p="16px"
                    transition="all 0.3s ease"
                    _hover={{
                      background: "#0041430D",
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                    w={{ base: "100%", md: "222px" }}
                    onClick={() => setSelected(item.id)}
                  >
                    <HStack gap={"8px"} pb="12px">
                      {item.colors.map((color, index) => (
                        <VStack key={color} spacing={1}>
                          <Box
                            w="34px"
                            h="34px"
                            borderRadius="50%"
                            bg={color}
                            ml={index === 0 ? 0 : "-22px"}
                            border={"1px solid"}
                            borderColor={"white"}
                          />
                        </VStack>
                      ))}
                    </HStack>

                    <Text fontSize="14px" fontWeight={"500"}>
                      {item.name[language] || item.name.en}
                    </Text>
                    <Text fontSize="12px" color="#6B7280">
                      {item.description[language] || item.description.en}
                    </Text>

                    <Flex flexWrap={"wrap"}>
                      <For each={item.colors}>
                        {(el, index) => (
                          <Text key={index} fontSize="12px" color="#BBBEC3">
                            {el}
                            {index !== item.colors.length - 1 ? "," : ""}
                          </Text>
                        )}
                      </For>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>

            <TextArea
              languages={languages}
              name={name}
              value={value?.description}
              onChange={handleInputChange}
              placeholder={t("dresscode_placeholder")}
              // disabled={!checked}
            />
          </>
        )}
      </Field.Root>
    </Stack>
  );
};

/* <Flex w="100%" gap="24px" justify={"space-between"}>
  <Selector
    name="style"
    value={value?.style}
    onChange={handleNestedChange}
    collection={createListCollection({ items: styles })}
    disabled={!checked}
  />
  <Selector
    name="color_palette_id"
    value={value?.colorPaletteId}
    onChange={handleNestedChange}
    collection={createListCollection({ items: schemes })}
    disabled={!checked}
  />
</Flex> */

// const handleNestedChange = (e) => {
//   const { name, value: inputValue } = e.target;
//   onChange({
//     target: {
//       name: "dressCode",
//       value: {
//         ...value,
//         [name]: inputValue,
//       },
//     },
//   });
// };

// const handleNestedChange = (e, lang) => {
//   if (e?.target) {
//     const { name, value: inputValue } = e.target;

//     if (name === "description") {
//       onChange({
//         target: {
//           name: "dressCode",
//           value: {
//             ...value,
//             description: {
//               ...value?.description,
//               [lang]: inputValue,
//             },
//           },
//         },
//       });
//     } else {
//       onChange({
//         target: {
//           name: "dressCode",
//           value: {
//             ...value,
//             [name]: inputValue,
//           },
//         },
//       });
//     }
//   }
// };
