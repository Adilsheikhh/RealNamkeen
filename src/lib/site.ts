export const SITE_NAME = "Real Foods";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://realfoods.vercel.app";

export const BUSINESS = {
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/brand/logo.png`,
  email: "realfoodspnr@gmail.com",
  telephones: ["+919526395590", "+919846906366"],
  address: {
    addressLocality: "Kannur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  geo: { latitude: 11.8745, longitude: 75.3704 },
  sameAs: [] as string[],
};

export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/images/brand/og-home.jpg`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — authentic murukku, achappam and namkeen from Kannur, Kerala`,
};