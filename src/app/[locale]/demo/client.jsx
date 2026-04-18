"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { subscribe } from "@/services/email";
import { success, info, warning } from "@/components/ui/alerts";
import soon from "@/assets/imgs/soon.png";
import soonMobile from "@/assets/imgs/soonMobile.png";

export const DemoClient = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await subscribe(email);
      success("Thank you! You will be notified.");
      setEmail("");
    } catch (err) {
      if (err.message === "Please enter your email address.") {
        info(err.message);
      } else {
        warning(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgImage={{ base: `url(${soonMobile.src})`, md: `url(${soon.src})` }}
      bgSize="cover"
      bgPosition="center center"
      bgRepeat="no-repeat"
      w="100vw"
      h="100vh"
    >
      <Center h="100vh">
        <Stack align={"center"} gap={{ base: "42px", md: "52px" }}>
          <Heading
            as="h1"
            fontFamily={"Montaga"}
            fontWeight={400}
            fontSize={{ base: "42px", md: "76px" }}
            lineHeight={"24px"}
            letterSpacing={"0px"}
            color={"#4B5563"}
          >
            Coming Soon
          </Heading>

          <Text
            pt={{ md: "32px" }}
            textAlign={"center"}
            width={{ base: "297px", md: "643px" }}
            fontWeight={400}
            // fontSize={"18px"}
            fontSize={{ base: "12px", md: "18px" }}
            lineHeight={"24px"}
            letterSpacing={"0px"}
            color={"#4B5563"}
          >
            Your dream wedding invitations — personalized, elegant, and
            effortless.
            <br /> Launching soon to make your big day unforgettable.
          </Text>

          <Stack
            as="form"
            gap={{ base: "48px", md: "32px" }}
            onSubmit={handleSubmit}
          >
            <Input
              w="327px"
              h={{ base: "44px", md: "52px" }}
              placeholder="e-mail address"
              border={"2px solid #80A0A154"}
              borderRadius={"9px"}
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              fontSize={{ base: "12px", md: "18px" }}
              lineHeight={"24px"}
              letterSpacing={"0px"}
              borderRadius={"10px"}
              type="submit"
              h={{ base: "44px", md: "52px" }}
              bg="#004143"
              disabled={loading}
              loading={loading}
            >
              Notify Me
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};
