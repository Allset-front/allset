import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { ConfirmClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("confirm_title");
  const description = t("confirm_text");

  return meta({ title, description, locale });
}

export default async function Confirm() {
  return <ConfirmClient />;
}
