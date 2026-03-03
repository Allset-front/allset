import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { TemplatesClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const title = t("template_title");
  const description = t("template_text");

  return meta({ title, description, locale });
}

export default async function Templates() {
  return <TemplatesClient />;
}
