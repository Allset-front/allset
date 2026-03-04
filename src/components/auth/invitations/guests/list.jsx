"use client";

import { useState } from "react";
import { Table, For, Box, Icon, Flex, Stack } from "@chakra-ui/react";
import { close, open } from "@/assets/svgs";

export const List = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row bg="#FFFFFF">
          <For each={headerItems}>
            {(el) => (
              <Table.ColumnHeader
                key={el}
                fontSize="16px"
                fontWeight={600}
                lineHeight="24px"
                color="#004143"
              >
                {el}
              </Table.ColumnHeader>
            )}
          </For>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={items}>
          {(item) => (
            <>
              <Table.Row
                bg={expandedId === item.id ? "#F4F8FD" : "#f6f6f7"}
                cursor="pointer"
                onClick={() => toggleRow(item.id)}
                _hover={{ bg: expandedId === item.id ? "#F4F8FD" : "#e8e8ea" }}
              >
                <Table.Cell verticalAlign="top">
                  {
                    <Icon
                      mr={"8px"}
                      transition="transform 0.4s ease"
                      transform={
                        expandedId === item.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)"
                      }
                    >
                      {expandedId == item.id ? close.icon : open.icon}
                    </Icon>
                  }
                  {item.mainGuestName}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  {item.accompanyingGuests.length} Guests
                  <br />
                  {expandedId === item.id && (
                    <Stack pt={"8px"} gap="8px" as="ul">
                      {item.accompanyingGuests.map((guest, index) => (
                        <li key={index}>{guest}</li>
                      ))}
                    </Stack>
                  )}
                </Table.Cell>
                <Table.Cell
                  verticalAlign="top"
                  color={
                    item.rsvpStatus === "Confirmed" ? "green.500" : "orange.400"
                  }
                >
                  {item.rsvpStatus === "Confirmed"
                    ? `Confirmed(${item.rsvpDate})`
                    : item.rsvpStatus}
                </Table.Cell>
                <Table.Cell verticalAlign="top">{item.note || "-"}</Table.Cell>
                <Table.Cell verticalAlign="top">{item.guestCount}</Table.Cell>
                <Table.Cell verticalAlign="top">{item.guestSide}</Table.Cell>
                <Table.Cell verticalAlign="top">{item.tableNumber}</Table.Cell>
              </Table.Row>
            </>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  );
};

const headerItems = [
  "Main guest name",
  "Accompanying guest(s)",
  "RSVP status",
  "Note",
  "Guest count",
  "Guest Side",
  "Table number",
];

const items = [
  {
    id: "1",
    mainGuestName: "Ani Poghosyan",
    accompanyingGuests: ["Guest 1", "Guest 2"],
    rsvpStatus: "Pending",
    note: "See you soon",
    guestCount: 4,
    guestSide: "Groom",
    tableNumber: 7,
  },
  {
    id: "2",
    mainGuestName: "Mikayel Karapetyan",
    accompanyingGuests: [
      "Alisa Karapetyan",
      "Meri Karapetyan",
      "Ashot Karapetyan",
    ],
    rsvpStatus: "Confirmed",
    rsvpDate: "23.06.25",
    note: "See you soon",
    guestCount: 4,
    guestSide: "Groom",
    tableNumber: 7,
  },
];
