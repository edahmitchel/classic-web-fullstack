import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [openProfile, setOpenProfile] = useState();
  const [chatList, setChatList] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
    // console.log("hello");
    // console.log(location);
  }, [location.pathname]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chatList,
        setChatList,
        setOpenProfile,
        openProfile,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
