import axios from "axios";
export const registerUser = async (user, toast, setLoading, navigate) => {
  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://classicweb.onrender.com/api/users",
      user,
      config
    );
    toast({
      title:
        "We appreciate you joining us and have sent a verification email to your account to confirm your membership. Please check your email and follow the instructions to complete the verification process.",
      // title: "thank you for joining us,a verification mail has been sent to you .",
      // description: .",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    // localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    // navigate("/chats");
  } catch (error) {
    console.log(error);
    toast({
      title: "error.",
      // description: error,
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};

// update user
export const updateUserDetails = async (
  user,
  toast,
  setLoading,
  token,
  setUser
) => {
  try {
    const config = {
      "Content-type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.patch(
      `https://classicweb.onrender.com/api/users`,
      user,
      config
    );
    console.log(data);
    toast({
      title: "succesfully updated.",
      // description: .",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
    setLoading(false);
    // navigate("/chats");
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
    const { data } = await axios.post(
      "https://classicweb.onrender.com/api/users/login",
      user,
      config
    );
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
// search user
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
    const { data } = await axios.get(
      `https://classicweb.onrender.com/api/users?search=${search}`,
      config
    );

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
    const { data } = await axios.post(
      `https://classicweb.onrender.com/api/chat`,
      { userId },
      config
    );
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

    const { data } = await axios.get(
      "https://classicweb.onrender.com/api/chat",
      config
    );
    console.log(data);
    setChatList(data);
  } catch (error) {
    console.log("fetch chat error");
    // toast({
    //   title: "Error Occured!",
    //   description: "Failed to Load the chats",
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    //   position: "bottom-left",
    // });
  }
};
export const fetchAllIntrestsChats = async (token, setAllIntrest, toast) => {
  // console.log(user._id);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "https://classicweb.onrender.com/api/chat/intrest",
      config
    );
    console.log(data);
    setAllIntrest(data);
  } catch (error) {
    console.log("fetch ALL INTREST error");
    // toast({
    //   title: "Error Occured!",
    //   description: "Failed to Load the chats",
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    //   position: "bottom-left",
    // });
  }
};
export const sendMessageCall = async (
  token,
  toast,
  newMessage,
  selectedChat,
  setNewMessage,
  setMessages,
  messages
) => {
  // console.log(
  //   `this is data to send${token} ${newMessage} ${selectedChat._id}, ${messages}}`
  // );
  try {
    let messageToSend = JSON.parse({
      content: "my sec group messagerrtr",
      chatId: "6361807a571c90d831a9cfac",
    });

    const config = {
      header: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "https://classicweb.onrender.com/api/message",
      messageToSend,
      config
    );
    console.log(`this is data${data}`);
    setNewMessage("");
    // setMessages({ ...messages, data });
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
};
// export const joinSingleIntrestChat
export const handleAddUser = async (
  chat,
  user,
  toast,
  chatList,
  setChatList,
  // setLoading,
  setSelectedChat,
  setFetchAgain,
  fetchAgain
) => {
  if (chat.users.find((u) => u._id === user._id)) {
    toast({
      title: "User Already in group!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    console.log("User already in group");

    return;
  }

  try {
    console.log("adding user");
    // setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `https://classicweb.onrender.com/api/chat/intrest/join`,
      {
        chatId: chat._id,
        userId: user._id,
      },
      config
    );
    console.log("done");
    // setChatList([data, ...chatList]);
    // setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    toast({
      title: `succesfully joined ${chat.chatName}.`,
      // description: .",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    // setLoading(false);
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    // setLoading(false);
  }
  // setGroupChatName("");
};
