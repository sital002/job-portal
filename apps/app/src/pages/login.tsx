import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login: React.FC = () => {
  const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  type LoginType = z.infer<typeof loginSchema>;
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const onLogin: SubmitHandler<LoginType> = (data) => {
    login.mutate(data);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {login.isError && (
          <p className="text-red-600 my-2">
            {login.error.response?.data.message}
          </p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="peer bg-gray-100 rounded-full w-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder=" "
              required
              {...register("email")}
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-gray-400 peer-focus:-top-6 peer-focus:text-pink-500 peer-focus:text-sm transition-all"
            >
              Email Address
            </label>
            {/* {errors.email && <p>{errors.email.message}</p>} */}
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="peer bg-gray-100 rounded-full w-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder=" "
              required
              {...register("password")}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-gray-400 peer-focus:-top-6 peer-focus:text-pink-500 peer-focus:text-sm transition-all"
            >
              Password
            </label>
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-full focus:outline-none shadow-lg hover:shadow-pink-500/50 transition-shadow duration-300"
          >
            Login
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-2 text-pink-500 hover:underline"
            >
              Create a new account
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
