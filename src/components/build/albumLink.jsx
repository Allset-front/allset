import { useTranslations } from "next-intl";
import { useState } from "react";
import { Field, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Label } from "@/components/build/typography/label";
import { Switcher } from "@/components/build/switcher";
import { InputUrl } from "../ui/inputUrl";

export const AlbumLink = ({ name, value, onChange, hide, required }) => {
  const t = useTranslations();

  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (e) => {
    setChecked(e.checked);
    hide(name, !e.checked);
  };

  return (
    <Stack borderRadius={"8px"} bg="white" p={{ base: "16px", md: "24px" }}>
      <Field.Root required={required} gap={"16px"}>
        <Field.Label as={Flex} w="100%" justify={"space-between"}>
          <HStack>
            <Field.RequiredIndicator />
            <Label text="photo_video" />
          </HStack>
          {!required && (
            <Switcher checked={checked} onChange={handleSwitchChange} />
          )}
        </Field.Label>

        <Text textStyle="xs" color={"#6B7280"}>
          {t("photo_video_text")}
        </Text>

        {checked && (
          <InputUrl
            name={name}
            value={value ?? ""}
            onChange={onChange}
            placeholder={t("photo_video_placeholder")}
            // disabled={!checked}
          />
        )}
      </Field.Root>
    </Stack>
  );
};
