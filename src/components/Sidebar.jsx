import { LogOutIcon, Search } from "lucide-react";
import OtherUsers from "./OtherUsers";
import axios from "../components/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { USER_API_END_POINT } from "../utils/constant.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const {otherUser} = useSelector(store=>store.user)

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "Logged out successfully!");
      navigate("/login");
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null))
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

 const searchHandler = (e) => {
  e.preventDefault();
  const filteredUsers = otherUser?.filter((user) =>
    user.fullname.toLowerCase().includes(search.toLowerCase())
  );
  
  if (filteredUsers && filteredUsers.length > 0) {
    dispatch(setOtherUsers(filteredUsers));
  } else {
    toast.error("User not found.");
  }
};


  return (
    <div className="md:w-[25vw] sm:w-[25vw] w-[95vw] h-[90vh]  bg-zinc-100">
      <div className="p-3 flex justify-between items-center">
        <h2 className="lg:text-3xl text-black font-black md:text-2xl sm:text-xl ">Chats</h2>
        <LogOutIcon
          onClick={handleLogout}
          name="logout"
          title="Logout"
          className="mt-3 w-5 h-5 text-black "
        />
      </div>
      <form
        onSubmit={searchHandler}
        className="flex items-center w-full  p-4 text-center mx-auto relative text-black"
      >
        <Search className="absolute left-7 text-gray-900 w-4 h-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search or start a new chat"
          className="w-full h-8 pl-10 pr-4 py-3 rounded-md border-b-2 border-green-800 focus:outline-none text-sm shadow shadow-green-800 relative text-gray-800 md:border-none "
        />
      </form>
      <OtherUsers />
    </div>
  );
};

export default Sidebar;
