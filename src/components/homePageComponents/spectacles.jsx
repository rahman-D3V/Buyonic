import React from "react";
import { useNavigate } from "react-router-dom";
import { ColourfulText } from "../ui/colourful-text";

const Spectacles = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center h-[80vh] bg-[#f9f8f6] px-8 md:px-20">
        {/* Left*/}
        <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
          <video
            src="https://img.warbyparker.com/AIR_ASSETS/0b0564e73edc838222397421cbf3fa38a6e41d08e07f0921160ceff05f435285.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl  h-[60vh] object-fit shadow-lg"
          />
        </div>

        {/* Right */}
        <div className="md:w-1/2 w-full text-center md:text-left md:pl-16">
          <h1 className="text-4xl md:text-5xl font-semibold leading-snug text-gray-900">
            Explore the{" "}
            <span className="text-black/65 italic font-extralight">Latest</span> eyewear
            crafted for comfort <br />
            and style.
          </h1>
          <button onClick={()=> navigate("eyeglasses")} className="mt-8 cursor-pointer bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-medium transition">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Spectacles;
