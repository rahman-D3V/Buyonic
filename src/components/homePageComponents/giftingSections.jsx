import React from "react";
import { gifting } from "../../data";
import { useCart } from "../../stores/cartStore";

const GiftingSections = () => {
  const addToCart = useCart((s) => s.addToCart);

  const isUserLogin = useCart((s) => s.isUserLogin);

  function handleCart(obj) {
    if (isUserLogin) {
      addToCart(obj);
    } else {
      alert("Please login First");
    }
  }

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
          {gifting.map((item) => {
            const { name, img1, price, deliveryEta, rating } = item;

            return (
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
                    className="hidden active:scale-95 group-hover:block absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold px-6 py-2 rounded-full w-[90%]"
                  >
                    ADD TO BAG
                  </button>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-base font-bold">₹{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GiftingSections;
