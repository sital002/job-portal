import React from "react";
import { motion } from "framer-motion";

const SignUp: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              className="peer bg-gray-200 rounded-full w-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-gray-400 peer-focus:-top-6 peer-focus:text-blue-500 peer-focus:text-sm transition-all"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="peer bg-gray-200 rounded-full w-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-gray-400 peer-focus:-top-6 peer-focus:text-blue-500 peer-focus:text-sm transition-all"
            >
              Email Address
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              className="peer bg-gray-200 rounded-full w-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-gray-400 peer-focus:-top-6 peer-focus:text-blue-500 peer-focus:text-sm transition-all"
            >
              Password
            </label>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full focus:outline-none shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
