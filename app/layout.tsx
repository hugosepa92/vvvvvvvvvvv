import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Remboursement Ameli - Assurance Maladie",
  description:
    "Recevez votre remboursement de l'Assurance Maladie rapidement et en toute sécurité. Service officiel Ameli.",
  keywords: ["remboursement", "ameli", "assurance maladie", "sécurité sociale", "santé"],
  authors: [{ name: "Assurance Maladie" }],
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Remboursement Ameli - Assurance Maladie",
    description: "Recevez votre remboursement de l'Assurance Maladie rapidement et en toute sécurité.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
