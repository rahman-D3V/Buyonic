import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../stores/cartStore";
import EmailVerificationModalUI from "../components/EmailVerificationModalUI";
import { sendOtpEmail } from "../utils/emailjs";
import { div, img } from "motion/react-client";

const currency = (n) =>
  Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function CartPage() {
  const items = useCart((s) => s.items);
  const removeFromCart = useCart((s) => s.removeFromCart);
  const clearCart = useCart((s) => s.clearCart);

  const navigate = useNavigate();

  const [express, setExpress] = useState(false);

  const [emailModal, setEmailModal] = useState(false);
  const [OTP, setOTP] = useState(null);
  const [userOTPInput, setUserOTPInput] = useState(null);
  const [wrongOTP, setWrongOTP] = useState(false);
  const [correctOTP, setCorrectOTP] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(false);

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
  }, [items]);

  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 49;

  const expressCharge = express && subtotal > 0 ? 39 : 0;

  const taxes = +(subtotal * 0.025).toFixed(2); // 2.5% tax

  const total = +(subtotal + shippingFee + expressCharge + taxes).toFixed(2);

  const isUserLogin = useCart((s) => s.isUserLogin);

  function verifyEmailOTP() {
    if (userOTPInput == OTP) {
      let userData = {};

      try {
        userData = JSON.parse(localStorage.getItem("auth_demo_v1")) || {};
      } catch (error) {
        console.log("Error reading user data", error);
      }

      // Save updated user data
      localStorage.setItem(
        "auth_demo_v1",
        JSON.stringify({ ...userData, isEmailVerified: true })
      );

      setEmailModal(false);
      setWrongOTP(false);
      setCorrectOTP(true);

      setTimeout(() => {
        setCorrectOTP(false);
      }, 2000);
    } else {
      setWrongOTP(true);

      setTimeout(() => {
        setWrongOTP(false);
      }, 2500);
    }
  }

  function handleCheckout() {
    try {
      let userData = JSON.parse(localStorage.getItem("auth_demo_v1"));
      let isEmailVerified = userData?.isEmailVerified;

      if (!isEmailVerified) {
        setEmailModal(true);

        const OTP = Math.floor(100000 + Math.random() * 900000);
        setOTP(OTP);
        console.log(OTP);
        return;
      }

      if (!address)
        return alert("Please enter delivery address before checkout.");
      // navigate("/checkout", { state: { total, items, address } });
      setOrderConfirm(true);
      clearCart();
      setTimeout(() => {
        navigate("/");
        setOrderConfirm(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    se;
  }

  // ---------- Start address autocomplete  ----------
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timerRef = useRef(null);

  const LOCATIONIQ_KEY = "pk.53e1391e43f5f0369bf48cdae2a6b436";

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const q = address?.trim();
    if (!q || q.length < 2 || q.length > 15) {
      setSuggestions([]);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        if (!LOCATIONIQ_KEY) {
          setSuggestions([]);
          return;
        }

        const url = `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(
          q
        )}&limit=6&countrycodes=IN&format=json`;

        const res = await fetch(url);
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        const items = (Array.isArray(data) ? data : []).map(
          (d) => d.display_name
        );
        setSuggestions(items);
      } catch (e) {
        setSuggestions([]);
      }
    }, 300); // debounce kept
  }, [address, LOCATIONIQ_KEY]);

  const onSelectSuggestion = (s) => {
    setAddress(s);
    setSuggestions([]);
  };
  // ---------- End address autocomplete ----------

  if (orderConfirm) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img
        className="h-80"
        src="https://assets-v2.lottiefiles.com/a/6192c96c-1184-11ee-94d6-87985660cc3b/eKofKHrW1u.gif"
        alt="order confirmed"
      />
    </div>
  );
}


  if (!items || items.length === 0 || !isUserLogin) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center pt-24">
        <img
          src="https://maloosgourmet.com/img/empty_cart.gif"
          className="mx-auto mb-6 w-48 h-48 object-contain"
          alt="Empty cart"
        />
        <p className="mb-4 text-gray-600">
          No items yet. Let’s fill your cart!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-shadow"
        >
          CONTINUE SHOPPING
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:pt-34 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left */}
        <section className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const { id, image, title, price, deliveryEta, rating } = item;
            return (
              <div
                key={id}
                className="flex gap-4 rounded-xl border border-slate-400 hover:shadow-xl bg-white p-4 shadow-sm items-center"
              >
                <img
                  src={image}
                  alt={title || "product image"}
                  className="h-24 w-24 rounded-md object-contain bg-gray-50 p-2"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="text-sm text-gray-600">{currency(price)}</p>
                  {deliveryEta && (
                    <p className="text-xs text-gray-500">
                      Delivery: {deliveryEta}
                    </p>
                  )}
                  {rating && (
                    <p className="text-xs text-gray-500">Rating: {rating}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(id)}
                    className="px-3 py-1 text-sm rounded-md border border-slate-400 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => clearCart()}
              className="px-4 py-2 rounded-md border hover:bg-gray-50"
            >
              Clear All
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
            >
              Continue Shopping
            </button>
          </div>
        </section>

        {/* Right -> cart Summary*/}
        <aside className="bg-white rounded-xl p-4 shadow-sm sticky top-30 h-fit self-start">
          <h2 className="text-lg font-medium mb-3">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-700">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : currency(shippingFee)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Taxes (2.5%)</span>
            <span>{currency(taxes)}</span>
          </div>

          <div className="mt-3 border-t border-slate-400 pt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={express}
                onChange={(e) => setExpress(e.target.checked)}
              />
              Express delivery (+{currency(39)})
            </label>
          </div>

          <div className="mt-4 flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-700 mb-1">
              Delivery address
            </label>

            <div className="relative">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat / Building, Street, City, PIN"
                className="w-full rounded-md border border-slate-400 outline-0 hover:border-slate-500 px-3 py-2 text-sm"
              />

              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border mt-1 rounded max-h-56 overflow-auto z-50 shadow-sm">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onMouseDown={(ev) => {
                        ev.preventDefault();
                        onSelectSuggestion(s);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              We will only use this for delivery details.
            </p>
            {!LOCATIONIQ_KEY && (
              <p className="text-xs text-red-500 mt-1">
                Autocomplete disabled — set REACT_APP_LOCATIONIQ_KEY in your
                .env
              </p>
            )}
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Proceed to Checkout
          </button>

          <p className="text-xs text-gray-500 mt-3">
            Estimated delivery: 3-6 business days
          </p>
        </aside>
      </div>
      <EmailVerificationModalUI
        emailModal={emailModal}
        setUserOTPInput={setUserOTPInput}
        verifyEmailOTP={verifyEmailOTP}
        OTP={OTP}
        setEmailModal={setEmailModal}
        wrongOTP={wrongOTP}
      />

      {correctOTP && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-fadeIn">
          Email verified successfully!
        </div>
      )}
    </main>
  );
}
