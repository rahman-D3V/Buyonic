import React, { useState } from "react";
import { sendOtpEmail } from "../utils/emailjs";

export default function EmailVerificationModalUI({
  emailModal,
  setEmailModal,
  setUserOTPInput,
  verifyEmailOTP,
  OTP,
  wrongOTP,
}) {
  const [email, setEmail] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);

  if (!emailModal) return null;

  // Send OTP
  function handleSendOTP() {
    let userName = "";
    try {
      let userData = JSON.parse(localStorage.getItem("auth_demo_v1"));
      userName = userData?.name || "";
    } catch (error) {
      alert("Error reading user data");
    }

    setSendingOTP(true);

    sendOtpEmail({
      to_email: email,
      username: userName,
      otp: OTP,
    })
      .catch((err) => {
        alert("Failed to send OTP. Try again.");
      })
      .finally(() => setSendingOTP(false));
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Verify Your Email
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            We’ll send a 6-digit OTP to confirm your email.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2 mb-6">
          <label className="block text-sm text-slate-600 font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            className={`
              w-full py-2.5 rounded-lg font-medium text-white transition-all
              ${
                sendingOTP
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }
            `}
          >
            {sendingOTP ? "Sending..." : "Send OTP"}
          </button>
        </div>

        {/* OTP */}
        <div className="space-y-2">
          <label className="block text-sm text-slate-600 font-medium">
            Enter OTP
          </label>

          <input
            type="text"
            maxLength={6}
            placeholder="••••••"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-lg tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            onChange={(e) => setUserOTPInput(e.target.value)}
          />

          {wrongOTP && (
            <p className="text-sm text-red-700 border border-red-300 bg-red-50 px-3 py-2 rounded-lg">
              Wrong OTP. Try again.
            </p>
          )}

          <button
            onClick={verifyEmailOTP}
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
          >
            Verify Email
          </button>
        </div>

        {/* Cancel */}
        <button
          onClick={() => setEmailModal(false)}
          className="mt-6 w-full text-center text-slate-500 text-sm hover:text-slate-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
