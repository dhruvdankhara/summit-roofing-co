import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.company.name} | GAF Master Elite® Roofing Contractor`,
  description: `${siteConfig.company.tagline} Denver metro and Colorado Front Range architectural roof replacements, $149 drone inspections, and 24/7 storm restoration.`,
  openGraph: {
    title: `${siteConfig.company.name} — Front Range Architectural Roofing`,
    description: siteConfig.company.tagline,
    url: siteConfig.company.liveSiteUrl,
    siteName: siteConfig.company.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Whop Hosted Platform Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!window.whop) {
                  var a = window.whop = {
                    q: [],
                    t: +new Date,
                    track: function() { a.q.push([+new Date].concat([].slice.call(arguments))); },
                    setScope: function() { a.q.push([+new Date, "setScope"].concat([].slice.call(arguments))); }
                  };
                  var s = document.createElement("script");
                  s.async = 1;
                  s.src = "https://t.whop.tw/s.js";
                  document.head.appendChild(s);
                }
                window.whop.setScope("${siteConfig.company.companyId}");
                window.whop.track("page");
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
