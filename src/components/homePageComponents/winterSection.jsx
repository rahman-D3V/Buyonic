import React from "react";
import { useNavigate } from "react-router-dom";

const WinterSection = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="relative mb-20">
        <video
          autoPlay
          muted
          loop
          className="w-full h-[450px] md:h-[520px] object-cover"
          src="https://assets.gymshark.com/wl6q2in9o7k3/7ARSYAfc8fPDpjqi8Vuwvi/daf83119a76774ff70d25439e9a50d3f/NOVEMBER_HERO_UNIVERSE_SEASONAL_MALE_1_8x3.mp4"
        />

        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* centered glass box */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div
            className="relative backdrop-blur-xl bg-white/10 border border-white/25
                    rounded-2xl px-6 py-5 md:px-10 md:py-7 text-center text-white
                    shadow-xl animate-fade-in-up"
          >
            {/* white glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl
                      bg-white/20 blur-2xl opacity-60 animate-fade-in-soft"
            ></div>

            <p className="text-xs md:text-sm font-medium tracking-[0.15em] uppercase opacity-90">
              Performance in the Cold
            </p>
            <p className="text-2xl md:text-4xl font-bold mt-2">
              Shop Winter Collection
            </p>

            {/* CTA */}
            <button onClick={() => navigate("/wintercollection")}
              href="#"
              className="mt-4 inline-flex items-center justify-center rounded-full
                   border border-white/40 bg-white/90 text-black
                   px-5 py-2 text-sm font-semibold transition-all
                   hover:bg-black hover:text-white hover:border-black
                   focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer"
            >
              Explore now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinterSection;
