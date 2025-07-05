import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUser: null,
    selectedUser: null,
    onlineUsers:[],
    Authenticated:false
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
     setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setAuthenticated:(state, action)=>{
      state.Authenticated = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser,setOnlineUsers,setAuthenticated } =
  userSlice.actions;
export default userSlice.reducer;
