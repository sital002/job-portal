import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 py-6 bg-inherit">
      <nav className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600">
            <NavLink to={"/"}>JobHub</NavLink>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-x-6"
        >
        
          <NavLink
            to={"/about"}
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            About Us
          </NavLink>
          <NavLink
            to={"/login"}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </NavLink>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
