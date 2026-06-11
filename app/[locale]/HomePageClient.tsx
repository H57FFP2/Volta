"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Manifesto } from "@/components/sections/Manifesto";
import { Works } from "@/components/sections/Works";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Collaboration } from "@/components/sections/Collaboration";
import { Marquee } from "@/components/ui/Marquee";
import { SectionFade } from "@/components/ui/SectionFade";
import { useLang } from "@/lib/language-context";

export default function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLang();

  return (
    <>

      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      <div className="relative min-h-screen bg-bg">
        <main>

          <Hero isLoaded={isLoaded} />

          <WhyUs />

          <Manifesto />

          <SectionFade />

          <Works />

          <div className="py-5 border-y border-[var(--border-color)] bg-muted overflow-hidden">
            <Marquee items={t.marquee} speed="normal" inverted />
          </div>

          <Services />

          <Process />

          <Contact />

          <Collaboration />
        </main>

        <Footer />
      </div>
    </>
  );
}
