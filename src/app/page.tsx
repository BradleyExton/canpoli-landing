import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Levels } from "@/components/Levels";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Demo />
        <Features />
        <HowItWorks />
        <Levels />
      </main>
      <Footer />
    </div>
  );
}
