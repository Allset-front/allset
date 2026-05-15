// import { cache } from "react";

export const pickLang = (obj, lang = "en") =>
  obj?.[lang] || obj?.en || obj?.hy || obj?.ru || "";

export async function getInvitationData(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEV}invitations/url/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Extra feature
// export const getInvitationData = cache(async (slug) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_DEV}invitations/url/${slug}`,
//       { next: { revalidate: 60 } },
//     );
//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// });