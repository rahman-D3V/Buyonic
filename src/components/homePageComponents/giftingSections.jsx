import React from "react";
import { gifting } from "../../data";

const GiftingSections = () => {
  return (
    <>
      <div className="bg-white p-6">
        <h1 className="text-2xl font-semibold mb-6 ml-4 text-gray-900">
          Gifting head start, this way
        </h1>

        <div
          className="flex overflow-x-auto gap-2 px-6  "
          style={{ scrollbarWidth: "none" }}
        >
          {gifting.map((item) => (
            <div
              key={item.id}
              className="shrink-0 w-72 cursor-pointer group bg-[#f1f3f6e8] p-1 pb-2"
            >
              <div className="relative w-full h-96 bg-gray-50">
                <img
                  src={item.img1}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:hidden"
                />
                <img
                  src={item.img2}
                  alt={item.name}
                  className="w-full h-full object-cover absolute top-0 left-0 hidden group-hover:block"
                />
                <button className="hidden group-hover:block absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-sm font-semibold px-6 py-2 rounded-full w-[90%]">
                  ADD TO BAG
                </button>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-base font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GiftingSections;
