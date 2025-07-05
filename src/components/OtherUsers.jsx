import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import SingleUser from "./SingleUser";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUser } = useSelector((store) => store.user);

  if (!otherUser || otherUser.length === 0) {
    return <p className="text-center mt-5 text-gray-500">No users found</p>;
  }

  return (
    <div className="overflow-auto max-h-[70vh]">
      {otherUser.map((user) => (
        <SingleUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
