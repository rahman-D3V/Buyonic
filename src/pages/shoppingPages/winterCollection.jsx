import React, { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronRight, FiHeart, FiSliders } from "react-icons/fi";
import {
  eyeglassesData,
  iphoneData,
  laptopsData,
  winterData,
} from "../../data";

const currency = (n) =>
  Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function WinterCollection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-5 flex items-center text-sm text-gray-600">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-900 font-medium">Winter Gym Collection</span>
      </nav>

      {/* Header + Sort/Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Winter Gym Collection</h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2`}
          >
            <FiSliders /> Relevance
          </button>
          <button className={`rounded-xl border px-3 py-2`}>
            Price · Low to High
          </button>
          <button className={`rounded-xl border px-3 py-2`}>
            Price · High to Low
          </button>
          <button className={`rounded-xl border px-3 py-2`}>
            Customer Rating
          </button>
        </div>
      </div>

      {/* Products*/}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {winterData.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const {
    title,
    image1,
    image2,
    price,
    mrp,
    rating,
    ratingCount,
    deliveryEta,
  } = product;
  const off = Math.max(0, Math.round(((mrp - price) / mrp) * 100));

  return (
    <div className="group rounded-2xl border bg-white p-4 shadow-sm    hover:shadow-md">
      <div className="relative mb-3">
        <img
          src={image1}
          alt={title}
          className="mx-auto h-55 w-55 object-contain   group-hover:opacity-0"
        />

        <img
          src={image2}
          alt={title}
          className="absolute inset-0 mx-auto h-55 w-55 object-contain opacity-0   group-hover:opacity-100"
        />

        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            {off}% off
          </span>
        )}

        <button
          className="absolute right-2 top-2 rounded-full border bg-white p-2 text-gray-700 hover:bg-gray-50"
          aria-label="Add to wishlist"
          title="Add to wishlist"
        >
          <FiHeart />
        </button>
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

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">
          Add to cart
        </button>
        <button className="rounded-xl border px-4 py-2 text-sm">Buy now</button>
      </div>
    </div>
  );
}
