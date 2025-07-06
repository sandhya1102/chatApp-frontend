import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../components/api/axiosInstance.js';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/v1/message/${selectedUser?._id}`, {
          withCredentials: true
        });

        if (Array.isArray(res.data)) {
          dispatch(setMessages(res.data)); 
        } else {
          dispatch(setMessages([])); 
        }
      } catch (error) {
        console.error("Error fetching messages", error);
        dispatch(setMessages([]));
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
