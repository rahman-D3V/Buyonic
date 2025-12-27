import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCart } from "../stores/cartStore";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const AUTH_KEY = "auth_demo_v1"; // localStorage key

const SignIn = () => {
  const [name, setName] = useState("");
  const [signInModal, setSignInModal] = useState(true); // true = sign-in, false = sign-up
  const [message, setMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);

  const navigate = useNavigate();

  const isUserLogin = useCart((s) => s.isUserLogin);
  const setIsUserLogin = useCart((s) => s.setIsUserLogin);

  const [showSignInProcess, setSignInProcess] = useState(false);

  // Sign-in form
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn, isSubmitting: isSigningIn },
    reset: resetSignIn,
    setValue,
  } = useForm({
    defaultValues: { name: "", password: "" },
  });

  // Sign-up form
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp, isSubmitting: isSigningUp },
    setValue: setSignUpValue,
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });

  // Sign-up handler: store credentials and log in the user
  const onSignUp = (data) => {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      isLogin: true,
      isEmailVerified: false,
    };
    setSignInProcess(true);
    saveAuth(payload);
    setIsUserLogin(true);

    setName(payload.name);
    setMessage({ type: "success", text: "Account created and signed in." });

    setTimeout(() => {
      navigate("/");
    }, 2000);

    // clear message after 3s
    setTimeout(() => setMessage(null), 3000);
  };

  // Sign-in handler: validating user with stored credentials in local Storage
  const onSignIn = (data) => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) {
        setMessage({
          type: "error",
          text: "No account found. Please sign up first.",
        });
        return;
      }
      const auth = JSON.parse(raw);
      if (auth.name === data.name.trim() && auth.password === data.password) {
        // success
        setSignInProcess(true);
        const next = { ...auth, isLogin: true };
        saveAuth(next);
        setIsUserLogin(true);

        setName(next.name);
        setMessage({ type: "success", text: "Signed in successfully." });
        resetSignIn();
        setTimeout(() => {
          setSignInProcess(false);
          navigate("/");
        }, 2000);
      } else {
        setMessage({ type: "error", text: "Invalid name or password." });
      }
    } catch {
      setMessage({ type: "error", text: "Unexpected error. Try again." });
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  function handleGuestCredentialsForSignIn() {
    setValue("name", "Guest");
    setValue("password", "Guest@123");
  }
  function handleGuestCredentialsForSignUp() {
    setSignUpValue("name", "Guest");
    setSignUpValue("email", "guest@gmail.com");
    setSignUpValue("password", "Guest@123");
  }

  function saveAuth(obj) {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
    } catch {
      // ignore
    }
  }

  // Load existing auth (if any) on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const auth = JSON.parse(raw);
        if (auth?.isLogin) {
          setIsUserLogin(true);
          setName(auth.name || "");
        }
      }
    } catch {
      // ignoring here any parse errors (if any)
    }
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {signInModal ? (
          <div
            key={"signin"}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Welcome back! Please enter your details to continue.
            </p>

            {message && (
              <div
                className={`mb-4 text-sm px-3 py-2 rounded ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleSubmitSignIn(onSignIn)}
              noValidate
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...registerSignIn("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name too short" },
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${
                    errorsSignIn.name ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-slate-200`}
                  placeholder="Enter your name"
                />
                {errorsSignIn.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errorsSignIn.name.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <input
                  {...registerSignIn("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${
                    errorsSignIn.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-slate-200 pr-10`}
                  placeholder="Enter your password"
                />

                {/* Icon */}
                <span
                  className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

                {errorsSignIn.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errorsSignIn.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all duration-200"
              >
                {isSigningIn ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-4 text-sm text-center flex justify-around">
              <button
                className="px-3 py-1.5 rounded-md cursor-pointer text-sm bg-[#45556c2c] text-black hover:bg-[#45556c51]"
                onClick={handleGuestCredentialsForSignIn}
              >
                Guest Credentials
              </button>
              <div className="px-3 py-1.5">
                New User:{" "}
                <button
                  className="text-slate-600 underline cursor-pointer"
                  onClick={() => {
                    setSignInModal(false);
                    setMessage(null);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            key={"signup"}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Please enter your details to continue.
            </p>

            {message && (
              <div
                className={`mb-4 text-sm px-3 py-2 rounded ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleSubmitSignUp(onSignUp)}
              noValidate
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...registerSignUp("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${
                    errorsSignUp.name ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-slate-200`}
                  placeholder="Enter your name"
                />
                {errorsSignUp.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errorsSignUp.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...registerSignUp("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${
                    errorsSignUp.email ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-slate-200`}
                  placeholder="Enter email"
                />
                {errorsSignUp.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errorsSignUp.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <input
                  {...registerSignUp("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                  type={showPasswordSignUp ? "text" : "password"}
                  className={`w-full px-4 py-2.5 border rounded-lg outline-none ${
                    errorsSignUp.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-slate-200 pr-10`}
                  placeholder="Enter your password"
                />

                <span
                  className="absolute right-3 top-12 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPasswordSignUp((prev) => !prev)}
                >
                  {showPasswordSignUp ? <FaEye /> : <FaEyeSlash />}
                </span>

                {errorsSignUp.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errorsSignUp.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all duration-200"
              >
                {isSigningUp ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 text-sm text-center flex justify-around">
              <button
                className="px-3 py-1.5 rounded-md cursor-pointer text-sm bg-[#45556c2c] text-black hover:bg-[#45556c51]"
                onClick={handleGuestCredentialsForSignUp}
              >
                Guest Credentials
              </button>
              <div className="text-sm text-center px-3 py-1.5">
                Already User:{" "}
                <button
                  className="text-slate-600 underline cursor-pointer"
                  onClick={() => {
                    setSignInModal(true);
                    setMessage(null);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          {isUserLogin ? `Signed in as ${name}` : "Not signed in"}
        </div>
      </div>

      {/* This just simulates the logout process to make it feel more realistic */}
      <div
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-200 ${
          showSignInProcess
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl bg-slate-800/95 px-4 py-2 shadow-md ring-1 ring-slate-200 dark:ring-slate-700">
          {/* Spinner using react-icons */}
          <FaSpinner className="h-5 w-5 animate-spin text-blue-400" />

          <div className="text-sm">
            <div className="font-medium text-slate-100">Logging in</div>
            <div className="text-xs text-slate-300">Please wait a moment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
