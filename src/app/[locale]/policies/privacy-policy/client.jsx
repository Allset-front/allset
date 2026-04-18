"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Separator,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Animate } from "@/components/ui/animate";

export const PolicyClient = () => {
  const t = useTranslations();

  return (
    <Box bg="#f6f6f7" py={{ base: "40px", md: "60px" }}>
      <Animate>
        <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
          <Stack gap="32px">
            {/* Header */}
            <Stack gap="8px">
              <Heading as="h1" size="3xl">
                {t("privacyPolicy_title")}
              </Heading>
              <Text fontSize="14px" fontWeight={700}>
                {t("privacyPolicy_lastUpdated")}
              </Text>
            </Stack>

            {/* Intro */}
            <Stack gap="12px">
              <Text>
                {t("privacyPolicy_welcome")}
                <br />
                {t("privacyPolicy_description")}
              </Text>
              <Text>{t("privacyPolicy_explanation")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_feature_invitations")}</li>
                <li>{t("privacyPolicy_feature_planning")}</li>
                <li>{t("privacyPolicy_feature_vendors")}</li>
              </Box>

              <Text fontWeight="500">{t("privacyPolicy_agreement")}</Text>
            </Stack>

            <Separator />

            {/* Section 1 */}
            <Stack gap="16px">
              <Heading size="2xl">{t("privacyPolicy_section1_title")}</Heading>

              <Heading size="lg" as="h3">
                {t("privacyPolicy_section1_1_title")}
              </Heading>
              <Text>{t("privacyPolicy_section1_1_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_personal_name")}</li>
                <li>{t("privacyPolicy_personal_email")}</li>
                <li>{t("privacyPolicy_personal_phone")}</li>
                <li>{t("privacyPolicy_personal_event")}</li>
              </Box>

              <Heading size="lg" as="h3">
                {t("privacyPolicy_section1_2_title")}
              </Heading>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_event_guests")}</li>
                <li>{t("privacyPolicy_event_rsvp")}</li>
                <li>{t("privacyPolicy_event_media")}</li>
                <li>{t("privacyPolicy_event_schedule")}</li>
              </Box>

              <Heading size="lg" as="h3">
                {t("privacyPolicy_section1_3_title")}
              </Heading>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_vendor_saved")}</li>
                <li>{t("privacyPolicy_vendor_messages")}</li>
                <li>{t("privacyPolicy_vendor_orders")}</li>
              </Box>

              <Heading size="lg" as="h3">
                {t("privacyPolicy_section1_4_title")}
              </Heading>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_auto_ip")}</li>
                <li>{t("privacyPolicy_auto_device")}</li>
                <li>{t("privacyPolicy_auto_activity")}</li>
                <li>{t("privacyPolicy_auto_cookies")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 2 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section2_title")}</Heading>
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

            <Separator />

            {/* Section 3 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section3_title")}</Heading>
              <Text fontWeight={600}>{t("privacyPolicy_no_sell")}</Text>
              <Text>{t("privacyPolicy_section3_intro")}</Text>

              <Text fontWeight="600">
                {t("privacyPolicy_section3_1_title")}
              </Text>
              <Text>{t("privacyPolicy_section3_1_text")}</Text>

              <Text fontWeight="600">
                {t("privacyPolicy_section3_2_title")}
              </Text>
              <Text>{t("privacyPolicy_section3_2_text")}</Text>

              <Text fontWeight="600">
                {t("privacyPolicy_section3_3_title")}
              </Text>
              <Text>{t("privacyPolicy_section3_3_text")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_section3_3_li_1")}</li>
                <li>{t("privacyPolicy_section3_3_li_2")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 4 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section4_title")}</Heading>

              <Text>{t("privacyPolicy_cookies_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_cookies_experience")}</li>
                <li>{t("privacyPolicy_cookies_analytics")}</li>
                <li>{t("privacyPolicy_cookies_preferences")}</li>
              </Box>

              <Text>{t("privacyPolicy_cookies_note")}</Text>
            </Stack>

            <Separator />

            {/* Section 5 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section5_title")}</Heading>

              <Text>{t("privacyPolicy_retention_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_retention_active")}</li>
                <li>{t("privacyPolicy_retention_service")}</li>
                <li>{t("privacyPolicy_retention_legal")}</li>
              </Box>

              <Text>{t("privacyPolicy_retention_delete")}</Text>
            </Stack>

            <Separator />

            {/* Section 6 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section6_title")}</Heading>
              <Text>{t("privacyPolicy_security_text")}</Text>
            </Stack>

            <Separator />

            {/* Section 7 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section7_title")}</Heading>
              <Text>{t("privacyPolicy_rights")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_rights_access")}</li>
                <li>{t("privacyPolicy_rights_correct")}</li>
                <li>{t("privacyPolicy_rights_delete")}</li>
                <li>{t("privacyPolicy_rights_withdraw")}</li>
                <li>{t("privacyPolicy_rights_object")}</li>
              </Box>

              <Text fontWeight={600}>{t("privacyPolicy_contact_email")}</Text>
            </Stack>

            <Separator />

            {/* Section 8 - 13 (compact) */}
            {["8", "9", "10", "11"].map((num) => (
              <>
                <Stack key={num} gap="8px">
                  <Heading size="2xl">
                    {t(`privacyPolicy_section${num}_title`)}
                  </Heading>
                  <Text>
                    {t(`privacyPolicy_section${num}_text`, {
                      default: "",
                    })}
                  </Text>
                </Stack>
                <Separator />
              </>
            ))}
            {/* Section 12 */}
            <Stack gap="8px">
              <Heading size="2xl">{t("privacyPolicy_section12_title")}</Heading>

              <Text fontWeight={600}>{t("privacyPolicy_company")}</Text>
              <Text>{t("privacyPolicy_email")}</Text>
              <Text>{t("privacyPolicy_website")}</Text>
            </Stack>
            <Separator />

            {/* Section 13 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("privacyPolicy_section13_title")}</Heading>

              <Text>{t("privacyPolicy_marketing_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_marketing_newsletter")}</li>
                <li>{t("privacyPolicy_marketing_updates")}</li>
                <li>{t("privacyPolicy_marketing_ads")}</li>
                <li>{t("privacyPolicy_marketing_info")}</li>
              </Box>

              <Text>{t("privacyPolicy_marketing_legal")}</Text>

              <Text>{t("privacyPolicy_marketing_unsubscribe")}</Text>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_marketing_unsubscribe_li_1")}</li>
                <li>{t("privacyPolicy_marketing_unsubscribe_li_2")}</li>
              </Box>

              <Text>{t("privacyPolicy_marketing_notice")}</Text>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("privacyPolicy_marketing_notice_li_1")}</li>
                <li>{t("privacyPolicy_marketing_notice_li_2")}</li>
                <li>{t("privacyPolicy_marketing_notice_li_3")}</li>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Animate>
    </Box>
  );
};
