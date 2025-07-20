import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "🍂 어텀인남산 파티룸 AI 어시스턴트",
  description:
    "어텀인남산 파티룸의 예약, 시설, 요금 등 모든 궁금한 점을 친절하게 안내해드리는 AI 어시스턴트입니다.",
  keywords: [
    "어텀인남산",
    "파티룸",
    "남산",
    "예약",
    "AI",
    "어시스턴트",
    "체크인",
    "체크아웃",
  ],
  authors: [{ name: "어텀인남산" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "🍂 어텀인남산 파티룸 AI 어시스턴트",
    description:
      "어텀인남산 파티룸 예약 및 이용 안내를 도와드리는 AI 어시스턴트",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body
        className={`${inter.variable} antialiased h-full bg-gray-50 font-sans`}
      >
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
