import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { PreviewClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("preview_title");
  const description = t("preview_text");

  return meta({ title, description, locale });
}

export default async function Preview() {
  return <PreviewClient />;
}
