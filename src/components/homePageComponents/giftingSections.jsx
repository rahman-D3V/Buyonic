import React, { useState } from "react";
import { gifting } from "../../data";
import { useCart } from "../../stores/cartStore";

const GiftingSections = () => {
  const addToCart = useCart((s) => s.addToCart);
  const isUserLogin = useCart((s) => s.isUserLogin);

  const [loginAlert, setLoginAlert] = useState(false);

  function handleCart(obj) {
    if (isUserLogin) {
      addToCart(obj);
    } else {
      setLoginAlert(true);
      setTimeout(() => {
        setLoginAlert(false);
      }, 2500);
    }
  }

  return (
    <>
      <div className="bg-white px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 ml-0 sm:ml-4">
          Gifting head start, this way
        </h1>

        <div
          className="flex overflow-x-auto gap-3 sm:gap-4 px-1 sm:px-4 pb-3 -mx-4 sm:mx-0"
          style={{ scrollbarWidth: "none" }} // hides scrollbar in Firefox
        >
          {gifting.map((item) => {
            const { name, img1, price, deliveryEta, rating } = item;

            return (
              <div
                key={item.id}
                className="shrink-0 w-56 sm:w-64 md:w-72 group bg-[#f1f3f6e8] rounded-xl p-2 pb-3"
              >
                <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={item.img1}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:hidden"
                  />
                  <img
                    src={item.img2}
                    alt={item.name}
                    className="w-full h-full object-cover absolute inset-0 hidden group-hover:block"
                  />
                  <button
                    onClick={() =>
                      handleCart({
                        id: crypto.randomUUID(),
                        title: name,
                        image: img1,
                        price,
                        deliveryEta,
                        rating,
                      })
                    }
                    className="hidden group-hover:block  active:scale-95 cursor-pointer absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold px-6 py-2 rounded-full w-[90%]"
                  >
                    ADD TO BAG
                  </button>
                </div>

                <div className="mt-3 space-y-1 px-1">
                  <p className="text-sm font-semibold line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-base font-bold">₹{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {loginAlert && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-red-50 text-red-700 border border-red-200 px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
              Log in first to start shopping
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GiftingSections;
