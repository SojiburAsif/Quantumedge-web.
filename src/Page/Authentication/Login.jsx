import React, { useState } from "react";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Login = () => {
  const { loginUser } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "Successfully logged in.",
        timer: 2000,
        showConfirmButton: false,
      });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-200/40 via-white to-green-100/30 px-4 relative">

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-semibold">Logging in...</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-[#0c130f] via-[#07260f] to-[#092710] rounded-2xl shadow-2xl w-full max-w-[1100px] flex overflow-hidden relative">

        {/* Left Side - Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center text-white">
          <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
          <p className="text-gray-400 mb-8">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-green-500 cursor-pointer">Sign Up</Link>
          </p>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-2.5 rounded-full border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-5 relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-2.5 rounded-full border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
            <FaRegEye
              className="absolute right-5 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPwd(!showPwd)}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="accent-green-500" />
              <span>Remember Me</span>
            </label>
            <span className="cursor-pointer hover:underline">Forgot Password?</span>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 transition rounded-full font-semibold text-black mb-8 shadow-lg shadow-green-500/30 flex justify-center items-center gap-2"
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Login Now
          </button>

          {/* OR Divider */}
          <div className="flex items-center mb-8">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-5">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <FaFacebookF className="text-lg" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <FaApple className="text-xl" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700">
              <FaXTwitter className="text-lg" />
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 relative p-14">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
            alt="Login"
            className="w-full h-full object-cover rounded-r-2xl clip-diagonal"
          />
          <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/70 text-white rounded-full hover:bg-red-600 transition">
            ✕
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
