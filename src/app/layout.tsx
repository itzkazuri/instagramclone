import { Poppins } from "next/font/google";
import "./globals.css";
import { convertToNextMetadata, generateDefaultMetadata } from "@/lib/metadata";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/SearchContext";
import { AppLayout } from "@/components/layout/AppLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Generate default metadata
const defaultMetadata = generateDefaultMetadata();
export const metadata = convertToNextMetadata(defaultMetadata);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <SidebarProvider>
          <SearchProvider>
            <AppLayout>{children}</AppLayout>
          </SearchProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}