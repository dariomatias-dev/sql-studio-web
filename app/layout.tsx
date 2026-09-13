import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeaderTransparencyProvider } from "@/context/header-transparency-context";

export const metadata: Metadata = {
  title: "SQL Studio",
  description: "Official SQL Studio website",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className="bg-background text-foreground selection:text-primary-foreground antialiased selection:bg-[#00BCD4]">
        <HeaderTransparencyProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </HeaderTransparencyProvider>
      </body>
    </html>
  );
};

export default RootLayout;
