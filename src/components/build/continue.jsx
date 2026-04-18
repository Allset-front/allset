"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useSearch } from "@/hooks/useSearch";
import { useTranslations } from "next-intl";
import { getNextRoute } from "../../utils/helpers";
import { isContinueDisabled } from "../../utils/checkers";
import { Button } from "@chakra-ui/react";
import { next } from "@/assets/svgs";
import { useAuth0 } from "@auth0/auth0-react";

export const Continue = () => {
  const [{ template, palette, accept }] = useQueryStates({
    template: parseAsString,
    palette: parseAsString,
    accept: parseAsString,
  });
  // console.log(template);
  // console.log(palette);
  // console.log(palette);

  const t = useTranslations();
  const pathname = usePathname();
  const search = useSearch();
  const router = useRouter();
  const nextInfo = getNextRoute(pathname);

  if (!nextInfo) return null;

  const { path, name } = nextInfo;
  const { isAuthenticated, loginWithPopup, isLoading } = useAuth0();

  const isCustomisationsPage = pathname?.includes(`/customisations`);
  const isDetailsPage = pathname?.includes(`/details`);
  const isConfirmPage = pathname?.includes(`/confirm`);

  const disabled = isContinueDisabled(pathname, {
    template,
    palette,
  });

  const handleClick = async () => {
    try {
      if (!isAuthenticated) {
        await loginWithPopup();
      }

      router.push(`${path}${search}`);
    } catch (err) {
      return;
    }
  };

  return isCustomisationsPage ? (
    <Button
      as={"button"}
      fontWeight="400"
      lineHeight="24px"
      bg="#004143"
      w={{ base: "100%", md: "137px" }}
      h="52px"
      border="1px solid"
      borderColor="white"
      boxShadow="xl"
      _hover={{
        bg: "white",
        color: "#004143",
        borderColor: "#004143",
        "& path": {
          fill: "#004143",
          transition: "all 0.3s ease",
        },
      }}
      transition="all 0.3s ease"
      disabled={isLoading || disabled}
      onClick={handleClick}
    >
      {t("next")} {next.icon}
      {/* {t("continue")} {t(name)} */}
    </Button>
  ) : isDetailsPage ? (
    <Button
      // loading
      type="submit"
      form="details"
      fontWeight="400"
      lineHeight="24px"
      bg="#004143"
      w={{ base: "100%", md: "137px" }}
      h="52px"
      border="1px solid"
      borderColor="white"
      boxShadow="xl"
      _hover={{
        bg: "white",
        color: "#004143",
        borderColor: "#004143",
        "& path": {
          fill: "#004143",
          transition: "all 0.3s ease",
        },
      }}
      transition="all 0.3s ease"
      disabled={disabled}
    >
      {/* {hasMultipleWords(name) ? name : `Continue to ${name}`} */}
      {/* {t("continue")} {t(name)} */}
      {t("next")} {next.icon}
    </Button>
  ) : isConfirmPage ? (
    <Button
      // loading
      type="submit"
      form="confirm"
      fontWeight="400"
      lineHeight="24px"
      bg="#004143"
      w={{ base: "100%", md: "137px" }}
      h="52px"
      border="1px solid"
      borderColor="white"
      boxShadow="xl"
      _hover={{
        bg: "white",
        color: "#004143",
        borderColor: "#004143",
        "& path": {
          fill: "#004143",
          transition: "all 0.3s ease",
        },
      }}
      transition="all 0.3s ease"
      disabled={disabled && !(accept == true || accept === "true")}
    >
      {t(name)}
    </Button>
  ) : (
    <Button
      as={!disabled ? Link : "button"}
      // to={!disabled ? path : undefined}
      href={!disabled ? `${path}${search}` : undefined}
      fontWeight="400"
      lineHeight="24px"
      bg="#004143"
      w={{ base: "100%", md: "137px" }}
      h="52px"
      border="1px solid"
      borderColor="white"
      boxShadow="xl"
      _hover={{
        bg: "white",
        color: "#004143",
        borderColor: "#004143",
        "& path": {
          fill: "#004143",
          transition: "all 0.3s ease",
        },
      }}
      transition="all 0.3s ease"
      disabled={disabled}
    >
      {t("next")} {next.icon}
      {/* {t("continue")} {t(name)} */}
    </Button>
  );
};
