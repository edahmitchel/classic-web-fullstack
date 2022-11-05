import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { getSender } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
// import { fetchChats } from "../../utils/apiCalls";
import ChatLoading from "../chatLoading";

const MyChats = ({ loggedUser, fetchAgain, setFetchAgain }) => {
  //   const [loggedUser, setLoggedUser] = useState();
  const {
    // user,
    // setUser,
    selectedChat,
    setSelectedChat,
    chatList,
    // setChatList,
  } = ChatState();
  //   const token = user.token;
  //   const toast = useToast();
  //   useEffect(() => {
  //     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  //     fetchChats(token, setChatList, toast);

  //     return () => {};
  //   }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        alignItems={"center"}
        p={3}
        backgroundColor="whatsapp.200"
        w={{ base: "100%", md: "15%" }}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Box
          pb={3}
          px={3}
          display="flex"
          fontSize={{ base: "28px", md: "30px" }}
          alignItems={"center"}
          backgroundColor="whatsapp.200"
          w="100%"
        >
          chats
        </Box>
        <Box
          display="flex"
          p={3}
          w="100%"
          h="100%"
          borderRadius={"lg"}
          overflow="hidden"
          backgroundColor="#F8F8F8"
          flexDirection="column"
        >
          {chatList ? (
            <Stack overflowY={"scroll"}>
              {chatList
                .filter((chat) => chat.isGroupChat === false)
                .map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor={"pointer"}
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text>{getSender(loggedUser, chat.users)}</Text>
                    {/* {chat.chatName} */}
                  </Box>
                ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
