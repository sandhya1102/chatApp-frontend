import axios from '../components/api/axiosInstance';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { MESSAGE_API_END_POINT } from '../utils/constant.js';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
   useEffect(()=>{
      if (!selectedUser?._id) return;

        const fetchMessages = async ()=>{
            try {
                const res = await axios.get(`${MESSAGE_API_END_POINT}${selectedUser._id}`,{
                    withCredentials:true
                })
                dispatch(setMessages(res.data))
                
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchMessages();
    },[selectedUser])
}

export default useGetMessages
