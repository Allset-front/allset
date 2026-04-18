"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  Icon,
  Input,
  InputGroup,
  CloseButton,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { calendar } from "../../assets/svgs";
import { formatDate } from "../../utils/formatters";
import { calendarLocales, currentYear, today } from "../../utils/constants";
import useOutsideClick from "../../hooks/useOutsideClick";

export const Calendar = ({ name, value, onChange, required }) => {
  const ref = useRef();

  const t = useTranslations();
  const language = useLocale();

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split("-").map(Number);
      setSelected(new Date(year, month - 1, day));
    } else {
      setSelected(null);
    }
  }, [value]);

  const handleSelect = (date) => {
    if (!date) return;
    setSelected(date);
    setOpen(false);

    onChange?.({
      target: {
        name,
        value: formatDate(date, "DD-MM-YYYY"),
      },
    });
  };

  // const formatted = selected
  // ? format(selected, "EEEE, MMMM d, yyyy", {
  //     locale: calendarLocales[language],
  //   })
  // : "";

  const formatted = selected ? formatDate(selected, "DD/MM/YYYY") : "";

  useOutsideClick(ref, open, setOpen);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} placement="center">
      <Dialog.Trigger asChild>
        <InputGroup startElement={<Icon>{calendar.icon}</Icon>}>
          <Input
            type="text"
            name={name}
            value={formatted}
            readOnly
            placeholder={t("choose_date")}
            required={required}
            onClick={() => setOpen(true)}
            variant="subtle"
            borderRadius={"4px"}
            bg="#F9FAFB"
            h="52px"
            format="yyyy-MM-dd"
          />
        </InputGroup>
      </Dialog.Trigger>

      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content
          ref={ref}
          width="fit-content"
          background="white"
          padding={"25px"}
        >
          <CloseButton
            size="sm"
            variant="outline"
            onClick={() => setOpen(false)}
            position="absolute"
            top="5px"
            right="5px"
          />
          {/* <Button
              onClick={() => setOpen(false)}
              // variant="outline"
              position="absolute"
              top="5px"
              right="5px"
              //
              fontWeight="400"
              fontSize="14px"
              borderRadius="8px"
              color="white"
            >
              X
            </Button> */}

          <Dialog.Body>
            <DayPicker
              locale={calendarLocales[language]}
              mode="single"
              // captionLayout="dropdown"
              navLayout="around"
              selected={selected}
              // fromYear={currentYear}
              // toYear={currentYear + 5}
              defaultMonth={selected || today}
              startMonth={new Date(currentYear, 0)}
              endMonth={new Date(currentYear + 1, 11)}
              disabled={{ before: today }}
              onSelect={handleSelect}
              // modifiersClassNames={{
              //   selected: "selected",
              // }}
              modifiersStyles={{
                selected: {
                  backgroundColor: "#004143",
                  color: "white",
                  borderRadius: "100%",
                },
              }}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
