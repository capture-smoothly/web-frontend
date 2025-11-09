"use client";
import Image from "next/image";
import acmeLogo from "@/app/assets/images/acme.png";
import quantumLogo from "@/app/assets/images/quantum.png";
import echoLogo from "@/app/assets/images/echo.png";
import celestialLogo from "@/app/assets/images/celestial.png";
import pulseLogo from "@/app/assets/images/pulse.png";
import apexLogo from "@/app/assets/images/apex.png";
import { motion } from "motion/react";

const images = [
  { src: acmeLogo, alt: "Acme Logo", key: 1 },
  { src: quantumLogo, alt: "Quantum Logo", key: 2 },
  { src: echoLogo, alt: "Echo Logo", key: 3 },
  { src: celestialLogo, alt: "Celestial Logo", key: 4 },
  { src: pulseLogo, alt: "Pulse Logo", key: 5 },
  { src: apexLogo, alt: "Apex Logo", key: 6 },
];

export const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container px-4 mx-auto">
        <h2 className="text-xl text-center text-white/70">
          Trusted by the World&apos;s most innovative Teams
        </h2>
        <div className="flex overflow-hidden mt-9 before:z-10 before:content-[''] after:content-[''] before:absolute after:absolute before:h-full after:h-full before:w-5 after:w-5 relative after:right-0 before:left-0 before:top-0 after:top-0 before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))] after:bg-[linear-gradient(to_left,#000,rgb(0,0,0,0))] ">
          <motion.div
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{ translate: 0 }}
            animate={{ translate: "-50%" }}
            className="flex flex-none gap-16 pr-16"
          >
            {images.map(({ src, alt, key }) => (
              <Image
                src={src}
                alt={alt}
                key={key}
                className="flex-none h-8 w-auto"
              />
            ))}
            {images.map(({ src, alt, key }) => (
              <Image
                src={src}
                alt={alt}
                key={key}
                className="flex-none h-8 w-auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
