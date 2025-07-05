import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="bg-white h-[90vh] w-[95vw] border-[1px] border-gray-300">
      <div className="flex h-full">
        {/* Sidebar: hide on mobile if user is selected */}
        <div className={`
          ${selectedUser ? 'hidden' : 'block'} 
          md:block sm:block
        `}>
          <Sidebar />
        </div>

        {/* Message Container: show only if user is selected or on wider screens */}
        <div className={`
          ${selectedUser ? 'block' : 'hidden'} 
          md:block 
          w-full
        `}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
