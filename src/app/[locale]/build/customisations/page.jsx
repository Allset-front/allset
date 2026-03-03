import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { CustomisationsClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const title = t("choose_palette");
  const description = t("select_palette");

  return meta({ title, description, locale });
}

export default async function Customisations() {
  return <CustomisationsClient />;
}
