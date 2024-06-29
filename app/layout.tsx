import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `OpenAi Engineer | I'm Luis Machine learnig Engineer`,
  description: `OpenAi Engineer | I'm Luis Machine learnig Engineer`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  );
}
