import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative text-gray-200 overflow-hidden">
            {/* Decorative big left glow (behind content) */}
            <div className="pointer-events-none absolute -left-40 -top-20 w-[520px] h-[520px] rounded-full blur-3xl bg-gradient-to-tr from-green-600/12 to-transparent" />

            {/* Top CTA */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col lg:flex-row items-start gap-8">
                <div className="lg:w-2/3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white">
                        Reach Your Requirement Goals Right on <br /> Schedule
                    </h2>
                </div>

                <div className="lg:w-1/3 text-left lg:text-right">
                    <p className="text-sm text-gray-300 mb-4">
                        Sign up, complete your profile, and start browsing projects. Submit
                        proposals and communicate with clients to get hired.
                    </p>
                    <button className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-medium shadow-lg">
                        Get Started
                    </button>
                </div>
            </div>

            {/* thin divider */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="h-px bg-[rgba(255,255,255,0.02)]" />
            </div>

            {/* Main footer columns */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Logo */}
                    <div className="space-y-6">
                        <div>
                            <img
                                src="https://i.ibb.co.com/f6zqCs3/521ed31f20ef6319a6b45c9c3855d0e9e1d4837f-1.png"
                                alt="Logo"
                            />
                        </div>
                    </div>

                    {/* Column 2: About */}
                    <div className="md:pl-8 md:border-l md:border-l-[rgba(255,255,255,0.02)]">
                        <h3 className="text-white font-medium mb-4">About</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="opacity-80 hover:underline cursor-pointer">About Us</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Become Seller</li>
                            <li className="opacity-80 hover:underline cursor-pointer">ProProJobs</li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div className="md:pl-8 md:border-l md:border-l-[rgba(255,255,255,0.02)]">
                        <h3 className="text-white font-medium mb-4">Categories</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="opacity-80 hover:underline cursor-pointer">Design &amp; Creative</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Development &amp; IT</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Music &amp; Audio</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Programming &amp; Tech</li>
                        </ul>
                    </div>

                    {/* Column 4: Support */}
                    <div className="md:pl-8">
                        <h3 className="text-white font-medium mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="opacity-80 hover:underline cursor-pointer">Help &amp; Support</li>
                            <li className="opacity-80 hover:underline cursor-pointer">FAQ</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Contact Us</li>
                            <li className="opacity-80 hover:underline cursor-pointer">Terms &amp; Services</li>
                        </ul>
                    </div>
                </div>

                {/* Social + Popular Posts */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Left: Social Icons */}
                    <div className="flex items-center gap-4 pl-3">
                        {/* Facebook */}
                        <button className="group w-10 h-10 rounded-full flex items-center justify-center bg-[#0b2a11] shadow-md shadow-green-500/30 hover:bg-green-400 hover:shadow-lg hover:shadow-green-400 hover:scale-105 transition">
                            <FaFacebookF className="text-gray-300 group-hover:text-black transition" />
                        </button>

                        {/* Instagram */}
                        <button className="group w-10 h-10 rounded-full flex items-center justify-center bg-[#0b2a11] shadow-md shadow-green-500/30 hover:bg-green-400 hover:shadow-lg hover:shadow-green-400 hover:scale-105 transition">
                            <FaInstagram className="text-gray-300 group-hover:text-black transition" />
                        </button>

                        {/* Twitter */}
                        <button className="group w-10 h-10 rounded-full flex items-center justify-center bg-[#0b2a11] shadow-md shadow-green-500/30 hover:bg-green-400 hover:shadow-lg hover:shadow-green-400 hover:scale-105 transition">
                            <FaTwitter className="text-gray-300 group-hover:text-black transition" />
                        </button>
                    </div>



                    {/* Right: Popular Posts */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold">Our Popular Post</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* item 1 */}
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=400&h=240&dpr=1"
                                    alt="post"
                                    className="w-20 h-12 object-cover rounded"
                                />
                                <div>
                                    <div className="text-xs text-gray-400">November 7, 2024</div>
                                    <div className="text-sm text-gray-200 font-medium">
                                        Unveils the Best Canadian Cities for Biking
                                    </div>
                                </div>
                            </div>

                            {/* item 2 */}
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=400&h=240&dpr=1"
                                    alt="post"
                                    className="w-20 h-12 object-cover rounded"
                                />
                                <div>
                                    <div className="text-xs text-gray-400">November 7, 2024</div>
                                    <div className="text-sm text-gray-200 font-medium">
                                        Unveils the Best Canadian Cities for Biking
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* small divider and copyright */}
                <div className="mt-8 h-px bg-[rgba(255,255,255,0.02)]" />
                <div className="mt-6 py-6 text-center text-sm text-gray-400">
                    © QuantumEdge Software INC. 2025. All rights reserved.
                </div>
            </div>

            {/* small left-bottom glow */}
            <div className="pointer-events-none absolute left-8 bottom-40 w-72 h-72 rounded-full blur-3xl bg-gradient-to-tr from-green-600/12 to-transparent" />
        </footer>
    );
};

export default Footer;
