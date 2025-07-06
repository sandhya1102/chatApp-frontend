import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../api/axiosInstance.js";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser } from "../../redux/userSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
    setInput({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="w-16 mx-auto"
          />
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            Log In to WhatsApp
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={input.username}
              onChange={onEventHandler}
              name="username"
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full mt-1 outline-none bg-gray-200 text-black"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                value={input.password}
                onChange={onEventHandler}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full mt-1 pr-10 outline-none bg-gray-200 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center cursor-pointer text-black">
              <input
                type="checkbox"
                className="checkbox checkbox-success text-black mr-2"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-green-700 p-2 text-white w-full mt-2 rounded-lg cursor-pointer hover:bg-green-600"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
