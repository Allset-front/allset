import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { PolicyClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("privacy_policy");
  const description = t("privacyPolicy_description");

  return meta({ title, description, locale });
}

export default async function Policy() {
  return <PolicyClient />;
}
