import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
