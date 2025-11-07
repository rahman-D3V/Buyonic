import React from "react";
import { bestDeals } from "../../data";
import { useNavigate } from "react-router-dom";

const BestDeals = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-6 bg-white mt-3">
        <h1 className="text-2xl font-semibold mb-6 ml-4">
          Best deals on Electronics
        </h1>

        <div className="flex flex-wrap justify-between gap-6">
          {bestDeals.map((item, i) => (
            <div
              key={i}
              className="w-56 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h2 className="mt-3 text-center text-sm font-semibold text-gray-800 line-clamp-2">
                {item.name}
              </h2>

              <p className="mt-1 text-center text-[11px] text-gray-500">
                *best price starts from
              </p>

              <div className="mt-1 text-center">
                <span className="text-base font-bold text-blue-700">
                  ₹{item.price}
                </span>{" "}
                <span className="text-gray-400 line-through text-sm">
                  ₹{item.oldPrice}
                </span>
              </div>

              <button
                className="mt-3 w-full border border-gray-300 rounded-full py-2 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-all cursor-pointer"
                onClick={() => navigate(`/${item.url}`)}
              >
                View Products
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestDeals;
