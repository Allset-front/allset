"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useGetAuthTanstack } from "@/hooks/useTanstack";
import { isNotEmptyArray } from "@/utils/checkers";
import { format } from "date-fns";
import {
  Skeleton,
  Table,
  For,
  Icon,
  Stack,
  Menu,
  Portal,
  Button,
} from "@chakra-ui/react";
import { guestsTableHeader } from "@/utils/constants";
import { openClose, status, actions, asc } from "@/assets/svgs";
import { Edit } from "./edit";

export const List = () => {
  const t = useTranslations();
  const [expandedId, setExpandedId] = useState(null);

  const { id } = useParams();
  const { isLoading, data } = useGetAuthTanstack(
    `confirmations/invitation/${id}`,
  );

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
                  w={el === "" ? "10px" : "auto"}
                  border="none"
                  py="17px"
                >
                  {el === "guest_name" && <Icon mr="8px">{asc.icon}</Icon>}
                  {el === "status" && <Icon mr="8px">{status.icon}</Icon>}
                  {el && t(el)}
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
                <Table.Cell verticalAlign={expandedId === item.id && "top"}>
                  <Icon
                    mr={"15px"}
                    transition="transform 0.3s ease"
                    transform={
                      expandedId === item.id ? "rotate(180deg)" : "rotate(0deg)"
                    }
                  >
                    {openClose.icon}
                  </Icon>
                  {item.mainGuest}
                  {expandedId === item.id && item.createdBy !== "GUEST" && (
                    <Stack pl="20px" pt="8px">
                      {/* {item.createdBy} */} {t("by_me")}
                    </Stack>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {item.secondaryGuests?.length || 0} {t("guest")}
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
                  verticalAlign={expandedId === item.id && "top"}
                  color={
                    item.status === "CONFIRMED"
                      ? "green.500"
                      : item.status === "DECLINED"
                        ? "red.500"
                        : "orange.400"
                  }
                >
                  {t(item.status.toLowerCase())}
                  {item.status === "CONFIRMED" &&
                    format(new Date(item.createdAt), " (dd.MM.yy)")}
                </Table.Cell>
                <Table.Cell verticalAlign={expandedId === item.id && "top"}>
                  {item.notes || "-"}
                </Table.Cell>
                <Table.Cell verticalAlign={expandedId === item.id && "top"}>
                  {item.secondaryGuests?.length + 1}
                </Table.Cell>
                <Table.Cell verticalAlign={expandedId === item.id && "top"}>
                  {item.guestSide
                    ? item.guestSide.charAt(0).toUpperCase() +
                      item.guestSide.slice(1).toLowerCase()
                    : "-"}
                </Table.Cell>
                <Table.Cell verticalAlign={expandedId === item.id && "top"}>
                  {item.tableNumber || "-"}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button
                        variant="ghost"
                        padding="0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon>{actions.icon}</Icon>
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content p="0">
                          <Menu.Item value="edit" p="0">
                            <Edit id={item.id} />
                          </Menu.Item>
                          <Menu.Item value="delete" p="0">
                            <Button
                              w="100%"
                              variant="plain"
                              outline="none"
                              _hover={{ bg: "#CF2B2B", color: "#FFFFFF" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {t("delete")}
                            </Button>
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    )
  );
};
