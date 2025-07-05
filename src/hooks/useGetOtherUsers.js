import React, { useEffect } from 'react'
import axios from "../components/api/axiosInstance";
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant.js';

const useGetOtherUsers = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try {
                const res = await axios.get(`${USER_API_END_POINT}`,{
                    withCredentials:true
                })
               dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchOtherUsers();
    },[])
}

export default useGetOtherUsers
