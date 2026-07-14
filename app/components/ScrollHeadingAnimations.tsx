"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollHeadingAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>("main h1, main h2, main h3");

      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
