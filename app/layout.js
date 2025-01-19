import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brain Wave AI",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
  // appearance={{
  //   baseTheme: shadesOfPurple,
  //   variables: {
  //     colorPrimary: "#6366F1", // Lighter purple for primary actions
  //     colorBackground: "#F9FAFB", // Light grayish-white background
  //     colorInputBackground: "#FFFFFF", // Pure white for input backgrounds
  //     colorInputText: "#1F2937", // Dark gray for input text
  //   },
  //   elements: {
  //     formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white", // Bright blue for buttons
  //     card: "bg-white shadow-lg border border-gray-200", // Light card with shadow
  //     headerTitle: "text-indigo-600", // Indigo for titles
  //     headerSubtitle: "text-gray-500", // Subtle gray for subtitles
  //   },
  // }}
>

      <html lang="en">
        <body className={`${inter.className} animated-dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
