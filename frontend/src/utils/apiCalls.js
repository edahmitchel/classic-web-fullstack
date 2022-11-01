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
