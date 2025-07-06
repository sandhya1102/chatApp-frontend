import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);

  return (
    <div className="px-4 mt-3 flex-1 overflow-auto lg:h-[72vh] h-[76vh]">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
          <img
            src="https://cdn-icons-gif.flaticon.com/12744/12744452.gif"
            alt="No Messages"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-sm">No messages yet. Start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
