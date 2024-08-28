import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8">
      <motion.div
        className="lg:w-1/2 lg:pr-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
          Oops!
        </h1>
        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
          Page not found.
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <Link to="/">
          <motion.button
            className="bg-gray-900 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Homepage
          </motion.button>
        </Link>
      </motion.div>
      <motion.div
        className="lg:w-1/2 mt-8 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          src="assets/404pic.png"
          alt="404 Error - Robot looking confused"
          className="w-full h-2/5 rounded-lg shadow-lg object-cover"
        />
      </motion.div>
    </div>
  );
}
