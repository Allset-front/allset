"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { getStepInfo } from "../../utils/helpers";
import { Flex, Text, Circle, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@/i18n/routing";

import { checkedStep, dots, dotsGreen } from "@/assets/svgs";
import { totalSteps } from "@/utils/constants";

export const Steps = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { step, stepToPath, show } = getStepInfo(pathname);

  if (!show) return null;

  // V2 - with navigation
  return (
    <Flex
      align="center"
      gap={{ base: "12px", md: "28px" }}
      justifyContent={"space-between"}
    >
      <Flex align="center" gap={{ base: "4px", md: "8px" }}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const current = index + 1;
          const isCompleted = current < step;
          const isActive = current === step;

          const circle = (
            <Circle
              size="28px"
              fontSize={{ base: "10px", md: "12px" }}
              fontWeight="600"
              bg={
                isCompleted ? "transparent" : isActive ? "#004143" : "#F5F5F5"
              }
              color={isActive ? "#FFFFFF" : "#6B7280"}
              cursor={isCompleted ? "pointer" : "default"}
              _hover={isCompleted ? { opacity: 0.75 } : undefined}
              transition="opacity 0.2s"
            >
              {isCompleted ? <Icon>{checkedStep.icon}</Icon> : current}
            </Circle>
          );

          return (
            <Flex key={current} align="center" gap={{ base: "4px", md: "8px" }}>
              {isCompleted ? (
                <ChakraLink as={Link} href={stepToPath[current]}>
                  {circle}
                </ChakraLink>
              ) : (
                circle
              )}

              {current < totalSteps && (
                <Icon>{isCompleted ? dotsGreen.icon : dots.icon}</Icon>
              )}
            </Flex>
          );
        })}
      </Flex>

      <Text
        color={"#4B5563"}
        fontWeight={"400"}
        fontSize={{ base: "12px", md: "14px" }}
      >
        {t("step")} {step} of {totalSteps}
      </Text>
    </Flex>
  );
};

// V1 - no navigation
// return (
//   <Flex
//     align="center"
//     gap={{ base: "12px", md: "28px" }}
//     justifyContent={"space-between"}
//   >
//     <Flex align="center" gap={{ base: "4px", md: "8px" }}>
//       {Array.from({ length: totalSteps }).map((_, index) => {
//         const current = index + 1;
//         const isCompleted = current < step;
//         const isActive = current === step;

//         return (
//           <Flex key={current} align="center" gap={{ base: "4px", md: "8px" }}>
//             <Circle
//               size="28px"
//               fontSize={{ base: "10px", md: "12px" }}
//               fontWeight="600"
//               bg={
//                 isCompleted ? "transparent" : isActive ? "#004143" : "#F5F5F5"
//               }
//               color={isActive ? "#FFFFFF" : "#6B7280"}
//             >
//               {isCompleted ? <Icon>{checkedStep.icon}</Icon> : current}
//             </Circle>

//             {current < totalSteps && (
//               <Icon>{isCompleted ? dotsGreen.icon : dots.icon}</Icon>
//             )}
//           </Flex>
//         );
//       })}
//     </Flex>

//     <Text
//       color={"#4B5563"}
//       fontWeight={"400"}
//       fontSize={{ base: "12px", md: "14px" }}
//     >
//       {t("step")} {step} of {totalSteps}
//     </Text>
//   </Flex>
// );
