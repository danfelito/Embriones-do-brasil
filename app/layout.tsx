import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Embriones do Brasil | Genética bovina en México",
  description: "Catálogo de embriones, cruzas, donadoras y genética bovina brasileña con inventario, videos y atención comercial en México.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
