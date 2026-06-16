"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { useLang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const COLORS = ["#16321f", "#20422a", "#2a5436", "#356643", "#427e52"];

function WhyUsNavigation() {
  const { index, itemsCount, setIndex } = useCarousel();
  const atStart = index === 0;
  const atEnd = index + 1 === itemsCount;

  const buttonClass =
    "pointer-events-auto flex h-14 w-14 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem] items-center justify-center rounded-full " +
    "border border-accent bg-bg/80 text-accent backdrop-blur-sm " +
    "transition-colors duration-300 ease-out " +
    "hover:bg-accent hover:text-bg " +
    "disabled:cursor-not-allowed disabled:border-fg/20 disabled:bg-bg/40 disabled:text-fg/30 disabled:hover:bg-bg/40 disabled:hover:text-fg/30";

  return (
    <>
      <button
        type="button"
        aria-label="Slide précédent"
        disabled={atStart}
        onClick={() => !atStart && setIndex(index - 1)}
        className={cn(
          buttonClass,
          "absolute top-1/2 z-20 -translate-y-1/2 -left-14 md:-left-16 lg:-left-20"
        )}
      >
        <ChevronLeft className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        aria-label="Slide suivant"
        disabled={atEnd}
        onClick={() => !atEnd && setIndex(index + 1)}
        className={cn(
          buttonClass,
          "absolute top-1/2 z-20 -translate-y-1/2 -right-14 md:-right-16 lg:-right-20"
        )}
      >
        <ChevronRight className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2.5} />
      </button>
    </>
  );
}

function WhyUsIndicator() {
  const { index, itemsCount, setIndex } = useCarousel();
  return (
    <div className="absolute -bottom-14 z-10 flex w-full items-center justify-center">
      <div className="flex space-x-3">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Aller au slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === i ? "w-8 bg-accent" : "w-2.5 bg-fg/30 hover:bg-fg/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function WhyUs() {
  const { t } = useLang();

  const reasons = t.why.reasons.map((r, i) => ({
    ...r,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <section id="why-us" className="relative bg-bg">
      <div className="px-6 md:px-10 pt-24 md:pt-36 pb-12 md:pb-20">
        <TextReveal
          as="h2"
          className="font-sans font-black text-[clamp(3rem,8vw,7.5rem)] leading-none text-fg"
        >
          {t.why.title}
        </TextReveal>
      </div>

      <div className="px-6 md:px-10 pb-32 md:pb-44">
        <div className="relative mx-auto w-full max-w-[88rem] px-14 md:px-16 lg:px-24">
          <Carousel>
            <CarouselContent>
              {reasons.map((reason) => (
                <CarouselItem key={reason.index} className="px-2 md:px-4">
                  <div
                    className="relative flex h-[560px] md:h-[680px] lg:h-[740px] w-full flex-col justify-between overflow-hidden rounded-[2rem] p-10 md:p-20"
                    style={{ backgroundColor: reason.color, color: "#ede8da" }}
                  >
                    <img
                      src="/VOLTAWEB/VOLTAWHITE2.png"
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -bottom-10 h-auto w-[clamp(20rem,40vw,36rem)] select-none"
                      style={{ opacity: 0.06 }}
                    />

                    <div className="relative z-10 flex items-center gap-5">
                      <span className="font-mono text-[15px] tracking-[0.3em]">
                        {reason.index}
                      </span>
                      <span
                        className="h-px w-16"
                        style={{ backgroundColor: "#ede8da", opacity: 0.4 }}
                      />
                    </div>

                    <div className="relative z-10 max-w-3xl">
                      <h3 className="mb-6 font-sans font-black text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-tight">
                        {reason.title}
                      </h3>
                      <p
                        className="font-sans text-[18px] leading-relaxed md:text-[22px]"
                        style={{ opacity: 0.85 }}
                      >
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <WhyUsNavigation />
            <WhyUsIndicator />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
