import axios from "axios";
export const registerUser = async (user, toast, setLoading, navigate) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users", user, config);
    toast({
      title: "thank you for joining us.",
      // description: .",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    toast({
      title: "error.",
      description: error.response.data.message,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};

// login user

export const loginUser = async (user, toast, setLoading, navigate) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", user, config);
    toast({
      title: "thank you for joining us.",
      // description: .",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    toast({
      title: "error.",
      description: error.response.data.message,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};
export const searchUser = async (
  user,
  search,
  toast,
  setLoading,
  setSearchResults
) => {
  try {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const { data } = await axios.get(`/api/users?search=${search}`, config);

    setLoading(false);
    setSearchResults(data);
  } catch (error) {
    toast({
      title: "error occured.",
      description: "failed to load search results",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
    setLoading(false);
  }
};

// access or create new chat
export const acessChat = async (
  userId,
  token,
  toast,
  setSelectedChat,
  setLoadingChat,
  onclose,
  chatList,
  setChatList
) => {
  try {
    setLoadingChat(true);
    const config = {
      "Content-type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post(`/api/chat`, { userId }, config);
    // setting chat data if it already exists
    if (!chatList.find((c) => c._id === data._id)) {
      setChatList([data, ...chatList]);
    }
    setSelectedChat(data);
    setLoadingChat(false);
    onclose();
  } catch (error) {
    toast({
      title: "error occured while fetching chat.",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
    setLoadingChat(false);
  }
};
// fetch chats]
export const fetchChats = async (token, setChatList, toast) => {
  // console.log(user._id);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    console.log(data);
    setChatList(data);
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: "Failed to Load the chats",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};
