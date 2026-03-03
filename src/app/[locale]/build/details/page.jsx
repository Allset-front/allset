import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { DetailsClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const title = t("details_title");
  const description = t("details_text");

  return meta({ title, description, locale });
}

export default async function Details() {
  return <DetailsClient />;
}
