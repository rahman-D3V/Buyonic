import React, { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronRight, FiSliders } from "react-icons/fi";
import { watchData } from "../../data";

const currency = (n) =>
  Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function SmartWatch() {
  const [instantFilter, setInstantFilter] = useState(null);
  const [sort, setSort] = useState("");

  // Get the updated product list after filtering and sorting
  const filteredProducts = useMemo(() => {
    let copy = structuredClone(watchData);

    if (instantFilter) {
      copy = copy.filter(
        (item) => item.gender === instantFilter || item.shape === instantFilter
      );
    }

    if (sort === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      copy.sort((a, b) => b.rating - a.rating);
    }

    return copy;
  }, [instantFilter, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-5 flex items-center text-sm text-gray-600">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-900 font-medium">Smart Watch</span>
      </nav>

      {/* Header + Sort/Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Smart watch</h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSort("relevance")}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2`}
          >
            <FiSliders /> Relevance
          </button>
          <button
            onClick={() => setSort("low-high")}
            className={`rounded-xl border px-3 py-2`}
          >
            Price · Low to High
          </button>
          <button
            onClick={() => setSort("high-low")}
            className={`rounded-xl border px-3 py-2`}
          >
            Price · High to Low
          </button>
          <button
            onClick={() => setSort("rating")}
            className={`rounded-xl border px-3 py-2`}
          >
            Customer Rating
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 items-center">
        {["Male", "Female", "Round"].map((chip) => {
          const active = chip === instantFilter;
          return (
            <button
              key={chip}
              onClick={() => setInstantFilter(chip)}
              className={`rounded-full px-3 py-1 text-sm cursor-pointer border transition
          ${
            active
              ? "bg-black text-white border-black"
              : "text-gray-700 hover:border-black hover:text-black"
          }`}
            >
              {chip}
            </button>
          );
        })}
        {instantFilter && (
          <button
            onClick={() => setInstantFilter(null)}
            className="rounded-full px-2.5 py-0.5 text-xs cursor-pointer border text-gray-500 hover:bg-gray-100 transition"
          >
            Reset ✕
          </button>
        )}
      </div>

      {/* Products grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { title, image, price, mrp, rating, ratingCount, deliveryEta } =
    product;
  const off = Math.max(0, Math.round(((mrp - price) / mrp) * 100));

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
        <span className="text-lg font-semibold">{currency(price)}</span>
        <span className="text-sm text-gray-500 line-through">
          {currency(mrp)}
        </span>
      </div>

      <p className="mt-1 text-xs text-gray-600">Save extra with No Cost EMI</p>
      <p className="text-xs text-gray-600">FREE delivery {deliveryEta}</p>

      <div className="mt-4 flex justify-center">
        <button className="w-4/5 rounded-2xl bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">
          Add to cart
        </button>
      </div>
    </div>
  );
}
