import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegEye, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";

// Hero image
const hero = "https://i.ibb.co.com/MxGNnBcw/ai-generated-9753233-1920.jpg";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-[#0b120b] w-[90%] max-w-2xl rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center border border-green-600 text-green-300 hover:bg-green-600/10"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-sm leading-relaxed text-gray-300 max-h-[60vh] overflow-auto">
          {children}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 text-black font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisterModal() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const { createUser } = UseAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "User registered successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const TermsOfService = (
    <div>
      <p className="mb-3">
        Welcome to our platform. These Terms of Service govern your access...
      </p>
    </div>
  );

  const PrivacyPolicy = (
    <div>
      <p className="mb-3">
        We respect your privacy. This Privacy Policy explains how we use your data...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-200/40 via-white to-green-100/30 px-6 py-8 relative">
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-semibold">Registering your account...</p>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-[1100px] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#061007] via-[#071d08] to-[#061307]">
        <button className="absolute z-20 right-6 top-6 w-9 h-9 flex items-center justify-center rounded-full border border-green-600 text-green-400 bg-black/40 hover:bg-green-600/20 transition">
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Open your account</h1>
            <p className="text-sm text-gray-300 mb-6 text-center">
              Already have an account? <Link to={"/login"} className="text-green-400 cursor-pointer">Sign in</Link>
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"><FaEnvelope /></span>
                <input
                  {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                  className={`w-full pl-14 pr-4 py-3 rounded-full bg-transparent border ${errors.email ? "border-red-500" : "border-gray-700"} placeholder-gray-400 outline-none focus:border-green-400 transition`}
                  placeholder="Email Address"
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"><FaLock /></span>
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                  className={`w-full pl-14 pr-14 py-3 rounded-full bg-transparent border ${errors.password ? "border-red-500" : "border-gray-700"} placeholder-gray-400 outline-none focus:border-green-400 transition`}
                  placeholder="Password"
                  type={showPwd ? "text" : "password"}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"><FaRegEye /></button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"><FaLock /></span>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className={`w-full pl-14 pr-14 py-3 rounded-full bg-transparent border ${errors.confirmPassword ? "border-red-500" : "border-gray-700"} placeholder-gray-400 outline-none focus:border-green-400 transition`}
                  placeholder="Confirm Password"
                  type={showConfirmPwd ? "text" : "password"}
                />
                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"><FaRegEye /></button>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full mt-2 py-3 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold shadow-lg shadow-green-500/30 transition">
                {loading ? "Registering..." : "Create Account"}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <div className="text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Social buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center hover:scale-105 transition text-2xl"><FaFacebookF /></button>
              <button className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center hover:scale-105 transition text-2xl"><FaApple /></button>
              <button className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center hover:scale-105 transition text-2xl"><FaXTwitter /></button>
            </div>

            {/* Terms & Privacy */}
            <p className="text-xs text-center text-gray-400 mt-6 max-w-[350px] mx-auto leading-relaxed">
              By joining, you agree to the Fiverr
              <button type="button" className="ml-1 text-green-400 underline" onClick={() => setOpenModal('terms')}>Terms of Service</button>
              and to occasionally receive emails from us. Please read our
              <button type="button" className="ml-1 text-green-400 underline" onClick={() => setOpenModal('privacy')}>Privacy Policy</button>
            </p>
          </div>

          {/* Right - Image */}
          <div className="w-full md:w-1/2 relative p-6 md:p-14 flex items-center justify-center">
            <img src={hero} alt="hero" className="w-[92%] h-[92%] object-cover rounded-tr-2xl rounded-br-2xl shadow-2xl" />
          </div>
        </div>

        {/* Modals */}
        {openModal === 'terms' && <Modal title="Terms of Service" onClose={() => setOpenModal(null)}>{TermsOfService}</Modal>}
        {openModal === 'privacy' && <Modal title="Privacy Policy" onClose={() => setOpenModal(null)}>{PrivacyPolicy}</Modal>}
      </div>
    </div>
  );
}
