import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user._id);

  const handleSelectedUser = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={handleSelectedUser}
      className={`${
        selectedUser?._id === user._id ? "bg-gray-300" : ""
      } mt-2 flex items-center gap-3 hover:bg-gray-300 p-2 cursor-pointer relative`}
    >
      <div className="relative">
        <img
          className="w-12 h-12 border rounded-full object-cover"
          src={user?.ProfilePhoto}
          alt="user-profile"
        />
        {isOnline && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="text-gray-800 flex items-center">
        <h4 className="text-[1rem]">{user?.fullname}</h4>
      </div>
    </div>
  );
};

export default SingleUser;
