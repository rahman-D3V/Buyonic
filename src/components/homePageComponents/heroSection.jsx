import React from "react";
import bg0 from "../../assets/bg0.gif";

const HeroSection = ({}) => {
  return (
    <>
      <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-2xl">
        <img
          src={bg0}
          alt="Featured collection"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/40 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-8 flex items-center">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-medium tracking-widest text-white/80 uppercase">
              New Season
            </span>

            <h1 className="mt-2 text-white text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
              Find your next favorite
            </h1>

            <div className="mt-8 flex gap-4">
              <a
                href="#best-deals"
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Shop now
              </a>
              {/* <a
                href="/collections"
                className="text-white/90 hover:text-white font-semibold px-3 py-3"
              >
                Browse all →
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
