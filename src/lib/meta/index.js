import { BASE_URL } from "../api/config";
import logo from "@/assets/imgs/allset.png";

export function meta({ title, description, locale }) {
    return {
        title: `${title} - Allset.am`,
        description,
        openGraph: {
            title: `${title} - Allset.am`,
            description,
            type: "website",
            url: `${BASE_URL}/${locale}`,
            images: [
                {
                    url: `${BASE_URL}${logo.src}`,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Allset.am`,
            description,
            images: [`${BASE_URL}${logo.src}`],
        },
        authors: [
            {
                name: "Allset.am",
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
}