import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { DetailsClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("details_title");
  const description = t("details_text");

  return meta({ title, description, locale });
}

export default async function Details() {
  return <DetailsClient />;
}
