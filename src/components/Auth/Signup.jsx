import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant.js";
import axios from "../api/axiosInstance.js";
import toast from "react-hot-toast";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleGenderChange = (gender) => {
    setInput((prev) => ({ ...prev, gender }));
  };

  const onEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
      console.error(error);
    }
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
            Sign Up for WhatsApp
          </h2>
          <p className="text-sm text-gray-500 mt-1">It's quick and easy.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={input.fullname}
              onChange={onEventHandler}
              name="fullname"
              type="text"
              placeholder="e.g. Kapil Sharma"
              className="input input-bordered w-full mt-1 outline-none bg-gray-200 text-black"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={input.username}
              onChange={onEventHandler}
              name="username"
              type="text"
              placeholder="e.g. sandhya123"
              className="input input-bordered w-full mt-1 outline-none bg-gray-200 text-black"
              required
            />
          </div>

          {/* Password */}
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
                placeholder="Create a strong password"
                className="input input-bordered w-full mt-1 pr-10 outline-none bg-gray-200 text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex items-center space-x-4 mt-1 text-gray-900">
              <label className="label cursor-pointer">
                <input
                  checked={input.gender === "male"}
                  onChange={() => handleGenderChange("male")}
                  type="radio"
                  name="gender"
                  className="radio radio-success mr-2"
                />
                <span className="label-text">Male</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  checked={input.gender === "female"}
                  onChange={() => handleGenderChange("female")}
                  type="radio"
                  name="gender"
                  className="radio radio-success mr-2"
                />
                <span className="label-text">Female</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-700 p-2 text-white w-full mt-2 rounded-lg cursor-pointer hover:bg-green-600"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
