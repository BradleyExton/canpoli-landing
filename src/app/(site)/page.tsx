import { Hero } from "./_components/sections/Hero";
import { Demo } from "./_components/sections/Demo";
import { Features } from "./_components/sections/Features";
import { HowItWorks } from "./_components/sections/HowItWorks";
import { Endpoints } from "./_components/sections/Endpoints";
import { ApiDocs } from "./_components/sections/ApiDocs";
import { DataSources } from "./_components/sections/DataSources";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Demo />
        <Features />
        <HowItWorks />
        <Endpoints />
        <ApiDocs />
        <DataSources />
      </main>
    </div>
  );
}
