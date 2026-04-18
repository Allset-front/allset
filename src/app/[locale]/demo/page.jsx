import { getLocale, getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { DemoClient } from "./client";

export async function generateMetadata() {
  const t = await getTranslations();
  const locale = await getLocale();
  const title = t("features");
  const description = t("features");

  return meta({ title, description, locale });
}

export default async function Demo() {
  return <DemoClient />;
}
