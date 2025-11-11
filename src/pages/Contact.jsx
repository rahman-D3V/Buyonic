import React, { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = useState(null);

  // Simulated submit handler
  async function onSubmit(data) {
    try {
      setStatus(null);
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
      reset();
      setTimeout(() => setStatus(null), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="bg-white py-10 shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-gray-900 text-3xl sm:text-4xl font-extrabold mb-2">
            Get in touch
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Have a question or need help? Fill the form and we'll reply as soon
            as we can.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-gray-900 text-xl sm:text-2xl font-semibold mb-4">
              Send us a message
            </h2>

            {status === "success" && (
              <div
                role="status"
                className="mb-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 text-sm"
              >
                Message sent. We'll reply shortly.
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm"
              >
                Something went wrong. Please try again later.
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Your name <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all duration-150 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-slate-100 ${
                    errors.name
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-300 focus:border-slate-500"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Email address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all duration-150 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-slate-100 ${
                    errors.email
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-300 focus:border-slate-500"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Issue */}
              <div>
                <label
                  htmlFor="issue"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Describe your issue <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="issue"
                  rows={6}
                  aria-invalid={errors.issue ? "true" : "false"}
                  {...register("issue", {
                    required: "Please describe your issue",
                    minLength: {
                      value: 10,
                      message: "Please provide more details (min 10 chars)",
                    },
                  })}
                  placeholder="Tell us what you need help with..."
                  className={`w-full px-4 py-3.5 border rounded-xl outline-none transition-all duration-150 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-slate-100 resize-none ${
                    errors.issue
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-300 focus:border-slate-500"
                  }`}
                />
                {errors.issue && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.issue.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 bg-slate-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.01] ${
                    isSubmitting
                      ? "opacity-90 cursor-wait"
                      : "hover:bg-slate-700"
                  }`}
                >
                  {isSubmitting ? (
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      />
                    </svg>
                  ) : null}
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right side*/}
          <aside className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 h-fit">
            <h3 className="text-gray-900 text-lg font-semibold mb-3">
              Contact details
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Prefer direct contact? Use the details below and we'll reply
              quickly.
            </p>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-1">
                  <MdEmail size={20} />
                </span>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <a
                    href="mailto:support@example.com"
                    className="text-sm text-slate-600 hover:underline"
                  >
                    support@example.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-1">
                  <MdPhone size={20} />
                </span>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <a
                    href="tel:+911234567890"
                    className="text-sm text-slate-600 hover:underline"
                  >
                    +91 12345 67890
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-1">
                  <MdLocationOn size={20} />
                </span>
                <div>
                  <p className="font-medium text-gray-800">Office</p>
                  <p className="text-sm text-slate-600">
                    123, Example Street, Connaught Place, New Delhi, India
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
