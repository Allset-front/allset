import { BASE_URL } from "../api/config";
import logo from "@/assets/imgs/allset.png";

export function meta({ title, description, locale }) {
    const fullTitle = title ? `${title} - Allset.am` : "Allset.am";

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            type: "website",
            url: `${BASE_URL}${locale}`,
            images: [
                {
                    url: `${BASE_URL}${logo.src}`,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [`${BASE_URL}${logo.src}`],
        },
        authors: [
            {
                name: "Allset.am",
                url: `${BASE_URL}${locale}`,
            },
        ],
        alternates: {
            canonical: `${BASE_URL}${locale}`,
            languages: {
                "am-AM": `${BASE_URL}hy`,
                "en-GB": `${BASE_URL}en`,
                "ru-RU": `${BASE_URL}ru`,
            },
        },
    };
}