import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          className="flex justify-between items-center space-x-4"
        >
          {user?.role === "USER" && (
            <div className="flex space-x-4">
              {" "}
              <NavLink
                to={"/jobs"}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold underline transition duration-300"
                    : "text-gray-600 hover:text-blue-600 transition duration-300"
                }
              >
                Jobs
              </NavLink>
              <NavLink
                to={"/jobs/appliedJobs"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold underline transition duration-300"
                    : "text-gray-600 hover:text-blue-600 transition duration-300"
                }
              >
                Applied Jobs
              </NavLink>
              <NavLink
                to={"/jobs/bookmarks"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold underline transition duration-300"
                    : "text-gray-600 hover:text-blue-600 transition duration-300"
                }
              >
                Bookmarks
              </NavLink>
            </div>
          )}
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold underline transition duration-300"
                : "text-gray-600 hover:text-blue-600 transition duration-300"
            }
          >
            About Us
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 ease-in-out"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to={"/login"}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </NavLink>
          )}
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
