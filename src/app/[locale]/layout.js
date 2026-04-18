import { getLocale, getMessages } from "next-intl/server";
import { AuthProvider } from "@/providers/authProvider";
import { QueryProvider } from "@/providers/queryProvider";
import { ChakraUIProvider } from "@/providers/chakraProvider";
import { NuqsProvider } from "@/providers/nuqsProvider";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/ui/header";
import { ScrollToTop } from "@/components/ui/scrollToTop";
import { Footer } from "@/components/public/footer";
import { fonts } from '../../assets/fonts'
import "../index.css";

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA Icons  */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />

        {/* Manifest */}
        <link rel="manifest" href={`/manifest.${locale}.json`} />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        {/* Open Graph / Facebook  */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* <meta property="og:url" content={canonicalUrl} /> */}
        <meta property="og:site_name" content="allset.am" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:creator" content="allset.am" />
        <meta property="fb:app_id" content="" />
      </head>
      <body
        className={fonts.variable}
        data-locale={locale}
        style={{ backgroundColor: "#f9fafb" }}
      >
        <AuthProvider>
          <QueryProvider>
            <ChakraUIProvider>
              <NuqsProvider>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <Header />
                  {children}
                  <Footer />
                  <ScrollToTop />
                </NextIntlClientProvider>
              </NuqsProvider>
            </ChakraUIProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}