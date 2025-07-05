import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const Message = ({ message }) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store=>store.user);

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message])

  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User profile"
            src={message?.senderId == authUser?._id ? authUser?.ProfilePhoto : selectedUser?.ProfilePhoto}/>
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-black">
          {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};

export default Message;
