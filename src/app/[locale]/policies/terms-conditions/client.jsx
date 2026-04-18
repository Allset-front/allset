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

export const TermsClient = () => {
  const t = useTranslations();

  return (
    <Box bg="#f6f6f7" py={{ base: "40px", md: "60px" }}>
      <Animate>
        <Container maxW="1440px" px={{ base: "24px", md: "40px" }}>
          <Stack gap="32px">
            {/* Header */}
            <Stack gap="8px">
              <Heading as="h1" size="3xl">
                {t("terms_conditions")} {t("terms_digital")}
              </Heading>
              <Text fontSize="14px" fontWeight={700}>
                {t("terms_lastUpdated")}
              </Text>
              <Text>{t("terms_welcome")}</Text>
            </Stack>

            <Separator />

            {/* Section 1 */}
            <Stack gap="16px">
              <Heading size="2xl">{t("terms_section1_title")}</Heading>

              <Text>{t("terms_section1_1_intro_1")}</Text>
              <Text>{t("terms_section1_1_intro_2")}</Text>
              <Text>{t("terms_section1_1_intro_3")}</Text>

              <Text>{t("terms_section1_1_intro_4")}</Text>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section1_1_intro_4_li_1")}</li>
                <li>{t("terms_section1_1_intro_4_li_2")}</li>
              </Box>

              <Text>{t("terms_section1_1_intro_5")}</Text>

              <Text>{t("terms_section1_1_intro_6")}</Text>
              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section1_1_intro_6_li_1")}</li>
                <li>{t("terms_section1_1_intro_6_li_2")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 2 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section2_title")}</Heading>
              <Text>{t("terms_usage_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_usage_li_1")}</li>
                <li>{t("terms_usage_li_2")}</li>
                <li>{t("terms_usage_li_3")}</li>
                <li>{t("terms_usage_li_4")}</li>
              </Box>

              <Text fontWeight={600}>{t("terms_enforcement")}</Text>
              <Text>{t("terms_enforcement_text")}</Text>
            </Stack>

            <Separator />

            {/* Section 3 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section3_title")}</Heading>
              <Text>{t("terms_section3_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section3_li_1")}</li>
                <li>{t("terms_section3_li_2")}</li>
                <li>{t("terms_section3_li_3")}</li>
                <li>{t("terms_section3_li_4")}</li>
              </Box>
              <Text fontWeight={600}>{t("terms_enforcement")}</Text>
              <Text>{t("terms_may")}</Text>
            </Stack>

            <Separator />

            {/* Section 4 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section4_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section4_li_1")}</li>
                <li>{t("terms_section4_li_2")}</li>
                <li>{t("terms_section4_li_3")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 5 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section5_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section5_li_1")}</li>
                <li>{t("terms_section5_li_2")}</li>
                <li>{t("terms_section5_li_3")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 6 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section6_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section6_li_1")}</li>
                <li>{t("terms_section6_li_2")}</li>
              </Box>

              <Text fontWeight={600}>{t("terms_promo")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_promo_li_1")}</li>
                <li>{t("terms_promo_li_2")}</li>
                <li>{t("terms_promo_li_3")}</li>
                <li>{t("terms_promo_li_4")}</li>
                <li>{t("terms_promo_li_5")}</li>
              </Box>

              <Text fontWeight={600}>{t("terms_ref")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_ref_li_1")}</li>
                <li>{t("terms_ref_li_2")}</li>
                <li>{t("terms_ref_li_3")}</li>
                <li>{t("terms_ref_li_4")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 7 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section7_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section7_li_1")}</li>
                <li>{t("terms_section7_li_2")}</li>
                <li>{t("terms_section7_li_3")}</li>
                <li>{t("terms_section7_li_4")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 8 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section8_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section8_li_1")}</li>
                <li>{t("terms_section8_li_2")}</li>
                <li>{t("terms_section8_li_3")}</li>
                <li>{t("terms_section8_li_4")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 9 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section9_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section9_li_1")}</li>
                <li>{t("terms_section9_li_2")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 10*/}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section10_title")}</Heading>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section10_li_1")}</li>
                <li>{t("terms_section10_li_2")}</li>
                <li>{t("terms_section10_li_3")}</li>
                <li>{t("terms_section10_li_4")}</li>
                <li>{t("terms_section10_li_5")}</li>
              </Box>
            </Stack>

            <Separator />

            {/* Section 11*/}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section11_title")}</Heading>
              <Text fontWeight={600}>{t("terms_section11_intro")}</Text>

              <Box as="ul" pl="20px" listStyleType="circle">
                <li>{t("terms_section11_li_1")}</li>
                <li>{t("terms_section11_li_2")}</li>
                <li>{t("terms_section11_li_3")}</li>
                <li>{t("terms_section11_li_4")}</li>
              </Box>
            </Stack>
            <Separator />

            {/* Section 12 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section12_title")}</Heading>

              <Text>{t("terms_section12_intro")}</Text>
            </Stack>
            <Separator />

            {/* Section 13 */}
            <Stack gap="12px">
              <Heading size="2xl">{t("terms_section13_title")}</Heading>

              <Text>{t("terms_section13_intro")}</Text>
            </Stack>
            <Separator />

            {/* Section 14 */}
            <Stack gap="8px">
              <Heading size="2xl">{t("terms_section14_title")}</Heading>

              <Text>{t("terms_for_email")}</Text>
              <Text fontWeight={600}>{t("privacyPolicy_email")}</Text>
            </Stack>
          </Stack>
        </Container>
      </Animate>
    </Box>
  );
};
