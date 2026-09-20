const BASE = "https://allset.am";

// Public, indexable routes only. Excluded on purpose:
// - /auth/* (private, also blocked in robots.txt)
// - /invitation/[slug] (per-event user content, not enumerable here)
// - /build flow steps except the templates entry (stateful, thin as landing pages)
// - [...not_found] catch-all
const ROUTES = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/build/templates", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
    // /demo excluded: it currently returns HTTP 500 (missing @supabase/supabase-js
    // in src/lib/email) and is a "Coming Soon" placeholder — no point promoting it.
    { path: "/connection", priority: 0.6, changeFrequency: "monthly" },
    { path: "/policies/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/policies/terms-conditions", priority: 0.3, changeFrequency: "yearly" },
];

const LOCALES = ["hy", "en", "ru"];

export default function sitemap() {
    const lastModified = new Date();

    // List every locale URL as its own primary <loc> (not just an hreflang
    // alternate) so Google discovers /hy, /en and /ru each as a first-class URL.
    return ROUTES.flatMap(({ path, priority, changeFrequency }) => {
        const languages = {
            hy: `${BASE}/hy${path}`,
            en: `${BASE}/en${path}`,
            ru: `${BASE}/ru${path}`,
            "x-default": `${BASE}/hy${path}`,
        };
        return LOCALES.map((loc) => ({
            url: `${BASE}/${loc}${path}`,
            lastModified,
            changeFrequency,
            priority,
            alternates: { languages },
        }));
    });
}
