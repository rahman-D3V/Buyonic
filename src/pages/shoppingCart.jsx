import React, { useMemo, useState } from "react";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiTag,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";

const currency = (n) => Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

// TODO: Replace this with your fetched cart
const INITIAL_ITEMS = [
  {
    id: "sku-1",
    title: "Casual Hoodie",
    variant: "Blue / M",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=600",
    qty: 1,
  },
  {
    id: "sku-2",
    title: "Running Shoes",
    variant: "Black / 9 UK",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    qty: 2,
  },
];

export default function Cart() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [coupon, setCoupon] = useState("");

  const subTotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  // tweak these rules as you like
  const discount = useMemo(() => (coupon.toUpperCase() === "BUYONIC10" ? subTotal * 0.1 : 0), [coupon, subTotal]);
  const shipping = useMemo(() => (subTotal > 1999 ? 0 : items.length ? 79 : 0), [subTotal, items.length]);
  const tax = useMemo(() => subTotal * 0.05, [subTotal]); // GST approx for demo
  const grandTotal = Math.max(subTotal - discount + shipping + tax, 0);

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const applyCoupon = (e) => {
    e.preventDefault();
    // plug your API/validation here
  };

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <FiShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-gray-600">Add items and they’ll show up here.</p>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white"
          >
            <FiArrowLeft /> Continue shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Shopping Cart ({items.length})</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm"
            >
              <img
                src={it.image}
                alt={it.title}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{it.title}</h3>
                    <p className="text-sm text-gray-600">{it.variant}</p>
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-xl border">
                    <button
                      onClick={() => updateQty(it.id, -1)}
                      className="px-3 py-2"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus />
                    </button>
                    <span className="w-10 text-center">{it.qty}</span>
                    <button
                      onClick={() => updateQty(it.id, 1)}
                      className="px-3 py-2"
                      aria-label="Increase quantity"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{currency(it.price * it.qty)}</p>
                    <p className="text-sm text-gray-500">₹{it.price} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <form onSubmit={applyCoupon} className="mb-4">
              <label className="mb-2 block text-sm font-medium">Coupon</label>
              <div className="flex gap-2">
                <div className="flex-1 inline-flex items-center gap-2 rounded-xl border px-3">
                  <FiTag className="shrink-0" />
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code (e.g. BUYONIC10)"
                    className="h-11 w-full outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-black px-4 text-white"
                >
                  Apply
                </button>
              </div>
            </form>

            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={currency(subTotal)} />
              <Row label="Discount" value={`- ${currency(discount)}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : currency(shipping)} />
              <Row label="Tax (est.)" value={currency(tax)} />
              <div className="my-3 h-px bg-gray-200" />
              <Row label="Total" value={currency(grandTotal)} bold />
            </div>

            <button className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:opacity-95">
              Proceed to Checkout
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              By placing your order, you agree to Buyonic’s Terms & Policies.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
