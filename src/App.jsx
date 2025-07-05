import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import ProtectedRoutes from "./components/ProtechtedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Homepage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  useEffect(() => {
    if (authUser) {
      const newsocket = io(import.meta.env.VITE_API_URL, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(newsocket));

      newsocket?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => newsocket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <>
      <div className="p-4 m-auto flex justify-center items-center h-screen bg-gray-200">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
