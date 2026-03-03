import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { PreviewClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const title = t("preview_title");
  const description = t("preview_text");

  return meta({ title, description, locale });
}

export default async function Preview() {
  return <PreviewClient />;
}
