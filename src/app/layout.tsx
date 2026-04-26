import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "Oanke",
  description: "La plateforme tout-en-un pour gérer votre commerce",
  // Explicitly specify the favicon URL so Next.js does not append a
  // Turbopack-generated content hash (e.g. ?favicon.0x3dzn~oxb6tn.ico).
  // A dynamic href on the server-rendered <link> can differ from the value
  // React 19 expects during hydration, causing a "attributes didn't match" error.
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <LangProvider>
          <AuthProvider>{children}</AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}
