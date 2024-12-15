import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/useAuth";


const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginType = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/jobs');
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoginError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup">
            <motion.button
              className="mt-2 text-blue-500 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Create a new account
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

