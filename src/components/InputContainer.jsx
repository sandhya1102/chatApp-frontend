import axios from '../components/api/axiosInstance';
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { MESSAGE_API_END_POINT } from '../utils/constant.js';

const InputContainer = () => {
  const [input,setInput] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${MESSAGE_API_END_POINT}/send/${selectedUser?._id}`, {message:input} , {
        headers:{
          "Content-Type":'application/json'
        },
        withCredentials:true
      })
      dispatch(setMessages([...messages,res?.data?.newMessage]))
    } catch (error) {
      console.error(error);
      
    }
    setInput("");
  }
  return (
    <form onSubmit={onSubmitHandler} >
      <div className="bg-gray-300 p-4 relative text-zinc-700">
        <input type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Type a text..'
        className='px-2 outline-none w-full text-gray-800'
        />
        <button type='submit' className='absolute inset-y-0 flex items-center right-2'>
            <Send className='w-5'/>
        </button>
      </div>
    </form>
  )
}

export default InputContainer
