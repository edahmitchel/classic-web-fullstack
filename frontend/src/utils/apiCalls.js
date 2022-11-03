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
export const acessChat = async (
  userId,
  token,
  toast,
  setSelectedChat,
  setLoadingChat,
  onclose
) => {
  try {
    setLoadingChat(true);
    const config = {
      "Content-type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post(`/api/chat`, { userId }, config);
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
