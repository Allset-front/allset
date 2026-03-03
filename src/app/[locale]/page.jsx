import { getTranslations } from "next-intl/server";
import { meta } from "@/lib/meta";
import { HomeClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const description = t("plan_desc");

  return meta({ description, locale });
}

export default async function Home() {
  return <HomeClient />;
}
