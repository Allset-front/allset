"use client";

import { useState } from "react";
import { isNotEmptyArray } from "@/utils/checkers";
import { Skeleton, Table, For, Icon, Stack } from "@chakra-ui/react";
import { guestsTableHeader } from "@/utils/constants";
import { close, open } from "@/assets/svgs";

export const List = ({ isLoading, data }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return <Skeleton w="100%" h="550px" />;
  }

  return (
    isNotEmptyArray(data) && (
      <Table.Root>
        <Table.Header>
          <Table.Row bg="#FFFFFF">
            <For each={guestsTableHeader}>
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
          <For each={data}>
            {(item) => (
              <Table.Row
                bg={expandedId === item.id ? "#F4F8FD" : "#f6f6f7"}
                cursor="pointer"
                onClick={() => toggleRow(item.id)}
                _hover={{ bg: expandedId === item.id ? "#F4F8FD" : "#e8e8ea" }}
              >
                <Table.Cell verticalAlign="top">
                  <Icon
                    mr={"8px"}
                    transition="transform 0.4s ease"
                    transform={
                      expandedId === item.id ? "rotate(180deg)" : "rotate(0deg)"
                    }
                  >
                    {expandedId === item.id ? close.icon : open.icon}
                  </Icon>
                  {item.mainGuest}
                  {expandedId === item.id && item.createdBy !== "GUEST" && (
                    <Stack pl="20px" pt="8px">
                      {/* {item.createdBy} */}Added by me
                    </Stack>
                  )}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  {item.secondaryGuests?.length || 0} Guests
                  <br />
                  {expandedId === item.id && (
                    <Stack pt={"8px"} gap="8px" as="ul">
                      {item.secondaryGuests?.map((guest, index) => (
                        <li key={index}>{guest}</li>
                      ))}
                    </Stack>
                  )}
                </Table.Cell>
                <Table.Cell
                  verticalAlign="top"
                  color={
                    item.status === "CONFIRMED"
                      ? "green.500"
                      : item.status === "DECLINED"
                        ? "red.500"
                        : "orange.400"
                  }
                >
                  {item.status === "CONFIRMED"
                    ? "Confirmed"
                    : item.status === "DECLINED"
                      ? "Declined"
                      : "Pending"}
                </Table.Cell>
                <Table.Cell verticalAlign="top">{item.notes || "-"}</Table.Cell>
                <Table.Cell verticalAlign="top">
                  {(item.secondaryGuests?.length || 0) + 1}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  {item.guestSide
                    ? item.guestSide.charAt(0).toUpperCase() +
                      item.guestSide.slice(1).toLowerCase()
                    : "-"}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  {item.tableNumber || "-"}
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    )
  );
};
