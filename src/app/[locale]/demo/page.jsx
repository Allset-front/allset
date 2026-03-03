import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/api/config";
import logo from "@/assets/imgs/allset.png";
import { DemoClient } from "./client";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const { locale } = params;

  const metadata = {
    // title: `${t("")} - Allset.am`,
    // description: t(""),
    openGraph: {
      // title: `${t("")} - Allset.am`,
      // description: t(""),
      images: [
        {
          url: `${BASE_URL}${logo.src}`,
          alt: "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Allset.am",
      // description: t(""),
      images: [`${BASE_URL}${logo.src}`],
    },
    authors: [
      {
        name: `allset.am`,
        url: `${BASE_URL}/${locale}`,
      },
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "am-AM": `${BASE_URL}/hy`,
        "en-GB": `${BASE_URL}/en`,
        "ru-RU": `${BASE_URL}/ru`,
      },
    },
  };

  return metadata;
}

export default async function Demo() {
  return <DemoClient />;
}
