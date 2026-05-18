"use client";

import React from "react";
import { DatePicker } from "@chakra-ui/react";
import { CalendarDate } from "@internationalized/date";

function parseToCalendarDate(dateStr) {
  if (!dateStr) return undefined;
  const [year, month, day] = dateStr.split("-").map(Number);
  return [new CalendarDate(year, month, day)];
}

export const Calendar = ({ value }) => {
  return (
    <DatePicker.Root
      inline
      readOnly
      defaultValue={parseToCalendarDate(value)}
      css={{
        "--chakra-colors-color-palette-solid": "var(--c-secondary)",
        "--chakra-colors-color-palette-muted": "var(--c-secondary)",
        "--chakra-colors-color-palette-emphasized": "var(--c-secondary)",
        "& [data-part='prev-trigger'], & [data-part='next-trigger']": {
          display: "none",
        },
        bg: "white",
        padding: "55px",
      }}
    >
      <DatePicker.View view="day" pointerEvents="none">
        <DatePicker.Header />
        <DatePicker.DayTable />
      </DatePicker.View>
      <DatePicker.View view="month" pointerEvents="none">
        <DatePicker.Header />
        <DatePicker.MonthTable />
      </DatePicker.View>
      <DatePicker.View view="year" pointerEvents="none">
        <DatePicker.Header />
        <DatePicker.YearTable />
      </DatePicker.View>
    </DatePicker.Root>
  );
};
