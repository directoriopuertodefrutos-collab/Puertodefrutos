import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { defaultMetadata } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E4D64",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://puertodefrutos.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Puerto de Frutos",
              url: "https://puertodefrutos.com",
              logo: "https://puertodefrutos.com/icons/logo-full.svg",
              description:
                "El directorio digital más completo del Puerto de Frutos de Tigre, Buenos Aires.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tigre",
                addressRegion: "Buenos Aires",
                addressCountry: "AR",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
