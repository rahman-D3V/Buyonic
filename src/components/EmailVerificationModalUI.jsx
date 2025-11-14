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
      .then(() => {
        // alert("OTP sent. Check your email.");
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Failed to send OTP. Try again.");
      })
      .finally(() => {
        setSendingOTP(false);
      });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Verify Your Email
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please verify your email before placing your order.
          </p>
        </div>

        {/* Email Input Section */}
        <div className="space-y-3 mb-6">
          <label className="block text-sm text-slate-600">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            className={`w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition ${sendingOTP ? "animate-pulse" : ""}`}
          >
            {sendingOTP ? "Sending" : "Send OTP"}
          </button>
        </div>

        {/* OTP Input Section */}
        <div className="space-y-3">
          <label className="block text-sm text-slate-600">Enter OTP</label>
          <input
            type="text"
            maxLength={6}
            placeholder="••••••"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setUserOTPInput(e.target.value)}
          />

          {wrongOTP && (
            <p className="text-sm text-red-700 border border-red-300 bg-red-50 px-3 py-2 rounded-md mt-2">
              Wrong OTP
            </p>
          )}

          <button
            onClick={() => verifyEmailOTP()}
            className="w-full bg-emerald-600 text-white py-2 rounded-md font-medium hover:bg-emerald-700 transition"
          >
            Verify Email
          </button>
        </div>

        
        <button
          onClick={() => setEmailModal(false)}
          className="mt-5 w-full text-center text-slate-500 text-sm hover:text-slate-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
