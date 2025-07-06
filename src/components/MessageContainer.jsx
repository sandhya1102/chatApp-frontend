import { ArrowLeft} from "lucide-react";
import InputContainer from "./InputContainer";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const dispatch= useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  if (!selectedUser) {
    return (
      <div className="w-full lg:h-[90vh] h-[80px] flex flex-col items-center justify-center text-gray-600">
        <img
          src="https://cdn-icons-gif.flaticon.com/15332/15332410.gif"
          alt="Start Chat"
          className="w-24 h-24 opacity-50"
        />
        <h2 className="mt-4 text-lg font-medium">
          Select a user to start a conversation
        </h2>
        <p className="text-sm text-gray-500">
          Your messages will appear here once you start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="border-b w-full border-gray-200 h-[calc(100vh-90px)]">
      <div className="flex items-center justify-between bg-gray-300 p-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              src={selectedUser?.ProfilePhoto}
              alt="User Avatar"
            />
            {isOnline && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <h4 className="text-sm font-medium text-gray-800">
            {selectedUser?.fullname}
          </h4>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200 transition flex items-center">
          <div className="md:hidden">
            <ArrowLeft
              className="w-5 h-5 text-gray-600 cursor-pointer mr-2"
              onClick={() => dispatch(setSelectedUser(null))}
            />
          </div>
        </button>
      </div>
      <Messages />
      <InputContainer />
    </div>
  );
};

export default MessageContainer;
