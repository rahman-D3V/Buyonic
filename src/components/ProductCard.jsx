import { useState } from "react";
import { useCart } from "../stores/cartStore";
import { FaStar } from "react-icons/fa";
import { EncryptedText } from "./ui/encrypted-text";

export function ProductCard({ product, addToCart }) {
  const { title, image, price, mrp, rating, ratingCount, deliveryEta } =
    product;
  const off = Math.max(0, Math.round(((mrp - price) / mrp) * 100));

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

  const currency = (n) =>
    Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
      n
    );

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-400 hover:shadow-md">
      <div className="relative mb-3">
        <img
          src={image}
          alt={title}
          className="mx-auto h-44 w-44 object-contain transition group-hover:scale-[1.02]"
        />

        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            {off}% off
          </span>
        )}
      </div>

      <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>

      <div className="mt-2 flex items-center gap-1 text-sm">
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-0.5 text-white">
          {rating.toFixed(1)} <FaStar className="h-3 w-3" />
        </span>
        <span className="text-gray-500">({ratingCount}k)</span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-semibold">
          <EncryptedText
            text={currency(price)}
            encryptedClassName="text-neutral-500"
            revealedClassName="text-black"
            revealDelayMs={75}
          />
        </span>
        <span className="text-sm text-gray-500 line-through">
          {currency(mrp)}
        </span>
      </div>

      <p className="mt-1 text-xs text-gray-600">Save extra with No Cost EMI</p>
      <p className="text-xs text-gray-600">FREE delivery {deliveryEta}</p>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() =>
            handleCart({
              title,
              price,
              image,
              rating,
              deliveryEta,
              id: crypto.randomUUID(),
            })
          }
          className="w-4/5 rounded-2xl   bg-slate-600 px-4 py-2 text-sm font-medium text-white active:scale-95 active:bg-slate-500 transition-transform duration-100 hover:opacity-95 cursor-pointer"
        >
          Add to cart
        </button>
      </div>
      {loginAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-50 text-red-700 border border-red-200 px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
            Log in first to start shopping
          </div>
        </div>
      )}
    </div>
  );
}
