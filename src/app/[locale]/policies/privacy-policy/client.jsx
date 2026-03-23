"use client";

import React from "react";
import { Box, Container, Heading, Text, Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const PolicyClient = () => {
  const t = useTranslations();

  return (
    <Box bg="#f6f6f7" py={{ base: "40px", md: "60px" }}>
      <Container maxW="900px" px={{ base: "24px", md: "40px" }}>
        <Stack spacing="32px">
          {/* Header */}
          <Stack spacing="8px">
            <Heading fontSize={{ base: "24px", md: "32px" }}>
              {t("privacyPolicy_title")}
            </Heading>
            <Text fontSize="14px" color="gray.500">
              {t("privacyPolicy_lastUpdated")}
            </Text>
          </Stack>

          {/* Intro */}
          <Stack spacing="12px">
            <Text>{t("privacyPolicy_welcome")}</Text>
            <Text>{t("privacyPolicy_description")}</Text>
            <Text>{t("privacyPolicy_explanation")}</Text>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_feature_invitations")}</li>
              <li>{t("privacyPolicy_feature_planning")}</li>
              <li>{t("privacyPolicy_feature_vendors")}</li>
            </Box>

            <Text fontWeight="500">{t("privacyPolicy_agreement")}</Text>
          </Stack>

          {/* Section 1 */}
          <Stack spacing="16px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section1_title")}
            </Heading>

            <Text fontWeight="600">{t("privacyPolicy_section1_1_title")}</Text>
            <Text>{t("privacyPolicy_section1_1_intro")}</Text>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_personal_name")}</li>
              <li>{t("privacyPolicy_personal_email")}</li>
              <li>{t("privacyPolicy_personal_phone")}</li>
              <li>{t("privacyPolicy_personal_event")}</li>
            </Box>

            <Text fontWeight="600">{t("privacyPolicy_section1_2_title")}</Text>
            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_event_guests")}</li>
              <li>{t("privacyPolicy_event_rsvp")}</li>
              <li>{t("privacyPolicy_event_media")}</li>
              <li>{t("privacyPolicy_event_schedule")}</li>
            </Box>

            <Text fontWeight="600">{t("privacyPolicy_section1_3_title")}</Text>
            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_vendor_saved")}</li>
              <li>{t("privacyPolicy_vendor_messages")}</li>
              <li>{t("privacyPolicy_vendor_orders")}</li>
            </Box>

            <Text fontWeight="600">{t("privacyPolicy_section1_4_title")}</Text>
            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_auto_ip")}</li>
              <li>{t("privacyPolicy_auto_device")}</li>
              <li>{t("privacyPolicy_auto_activity")}</li>
              <li>{t("privacyPolicy_auto_cookies")}</li>
            </Box>
          </Stack>

          {/* Section 2 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section2_title")}
            </Heading>
            <Text>{t("privacyPolicy_usage_intro")}</Text>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_usage_platform")}</li>
              <li>{t("privacyPolicy_usage_invitations")}</li>
              <li>{t("privacyPolicy_usage_planning")}</li>
              <li>{t("privacyPolicy_usage_contact")}</li>
              <li>{t("privacyPolicy_usage_personalization")}</li>
              <li>{t("privacyPolicy_usage_analytics")}</li>
              <li>{t("privacyPolicy_usage_security")}</li>
            </Box>
          </Stack>

          {/* Section 3 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section3_title")}
            </Heading>
            <Text>{t("privacyPolicy_no_sell")}</Text>
            <Text>{t("privacyPolicy_section3_intro")}</Text>

            <Text fontWeight="600">{t("privacyPolicy_section3_1_title")}</Text>
            <Text>{t("privacyPolicy_section3_1_text")}</Text>

            <Text fontWeight="600">{t("privacyPolicy_section3_2_title")}</Text>
            <Text>{t("privacyPolicy_section3_2_text")}</Text>

            <Text fontWeight="600">{t("privacyPolicy_section3_3_title")}</Text>
            <Text>{t("privacyPolicy_section3_3_text")}</Text>
          </Stack>

          {/* Section 4 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section4_title")}
            </Heading>

            <Text>{t("privacyPolicy_cookies_intro")}</Text>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_cookies_experience")}</li>
              <li>{t("privacyPolicy_cookies_analytics")}</li>
              <li>{t("privacyPolicy_cookies_preferences")}</li>
            </Box>

            <Text>{t("privacyPolicy_cookies_note")}</Text>
          </Stack>

          {/* Section 5 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section5_title")}
            </Heading>

            <Text>{t("privacyPolicy_retention_intro")}</Text>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_retention_active")}</li>
              <li>{t("privacyPolicy_retention_service")}</li>
              <li>{t("privacyPolicy_retention_legal")}</li>
            </Box>

            <Text>{t("privacyPolicy_retention_delete")}</Text>
          </Stack>

          {/* Section 6 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section6_title")}
            </Heading>
            <Text>{t("privacyPolicy_security_text")}</Text>
          </Stack>

          {/* Section 7 */}
          <Stack spacing="12px">
            <Heading fontSize="20px">
              {t("privacyPolicy_section7_title")}
            </Heading>

            <Box as="ul" pl="20px" listStyleType="circle">
              <li>{t("privacyPolicy_rights_access")}</li>
              <li>{t("privacyPolicy_rights_correct")}</li>
              <li>{t("privacyPolicy_rights_delete")}</li>
              <li>{t("privacyPolicy_rights_withdraw")}</li>
              <li>{t("privacyPolicy_rights_object")}</li>
            </Box>

            <Text>{t("privacyPolicy_contact_email")}</Text>
          </Stack>

          {/* Section 8 - 13 (compact) */}
          {["8", "9", "10", "11"].map((num) => (
            <Stack key={num} spacing="8px">
              <Heading fontSize="20px">
                {t(`privacyPolicy_section${num}_title`)}
              </Heading>
              <Text>
                {t(`privacyPolicy_section${num}_text`, {
                  default: "",
                })}
              </Text>
            </Stack>
          ))}
        </Stack>

        {/* Section 12 */}
        <Stack spacing="8px">
          <Heading fontSize="20px">
            {t("privacyPolicy_section12_title")}
          </Heading>

          <Text>{t("privacyPolicy_company")}</Text>
          <Text>{t("privacyPolicy_email")}</Text>
          <Text>{t("privacyPolicy_website")}</Text>
        </Stack>

        {/* Section 13 */}
        <Stack spacing="12px">
          <Heading fontSize="20px">
            {t("privacyPolicy_section13_title")}
          </Heading>

          <Text>{t("privacyPolicy_marketing_intro")}</Text>

          <Box as="ul" pl="20px" listStyleType="circle">
            <li>{t("privacyPolicy_marketing_newsletter")}</li>
            <li>{t("privacyPolicy_marketing_updates")}</li>
            <li>{t("privacyPolicy_marketing_ads")}</li>
            <li>{t("privacyPolicy_marketing_info")}</li>
          </Box>

          <Text>{t("privacyPolicy_marketing_legal")}</Text>

          <Text>{t("privacyPolicy_marketing_unsubscribe")}</Text>

          <Text>{t("privacyPolicy_marketing_notice")}</Text>
          <Box as="ul" pl="20px" listStyleType="circle">
            <li>{t("privacyPolicy_marketing_notice_li_1")}</li>
            <li>{t("privacyPolicy_marketing_notice_li_2")}</li>
            <li>{t("privacyPolicy_marketing_notice_li_3")}</li>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
