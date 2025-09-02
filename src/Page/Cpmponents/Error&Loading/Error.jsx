import React from 'react';
import errorAnimation from '../../../assets/Lottii/Animation - 1748975144594.json';
import { Link } from 'react-router';
import Lottie from 'react-lottie';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
            {/* Lottie Animation */}
            <Lottie options={defaultOptions} height={300} width={300} />

            {/* Error Icon */}
            <div className="text-green-600 text-6xl mt-4 flex items-center justify-center gap-2 animate-bounce">
                <FaExclamationTriangle />
                <span>404</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mt-4">Oops! Page Not Found</h2>
            <p className="text-gray-700 mt-2 text-lg max-w-md">
                The page you're looking for doesn't exist or something went wrong.
            </p>

            {/* Go Back Home Button */}
            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 font-semibold shadow-lg shadow-green-300 transition"
            >
                <FaHome />
                Go Back Home
            </Link>

            {/* Extra Suggestion */}
            <p className="mt-6 text-gray-600 text-sm">
                Or check out our <Link to="/" className="text-green-500 underline hover:text-green-600">homepage</Link> for other sections.
            </p>
        </div>
    );
};

export default Error;
