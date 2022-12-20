import { Box, Button, Divider, Stack, Text } from "@chakra-ui/react";
// import React, { useState } from "react";
import { getSender } from "../config/chatLogic";
import { ChatState } from "../context/chatProvider";
// import { fetchChats } from "../../utils/apiCalls";
import ChatLoading from "./chatLoading";

const MyChats = ({
  loggedUser,
  fetchAgain,
  setFetchAgain,
  currentTab,
  setCurrentTab,
  openProfile,
}) => {
  // const [loggedUserState, setLoggedUserState] = useState();
  const {
    // user,
    // setUser,
    selectedChat,
    setSelectedChat,
    chatList,
    // setChatList,
  } = ChatState();
  // setCurrentTab("intrests");
  //   const token = user.token;
  //   const toast = useToast();
  //   useEffect(() => {
  //     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  //     fetchChats(token, setChatList, toast);

  //     return () => {};
  //   }, []);

  return (
    <>
      {/* <Box
        display={"flex"}
        flexDirection="column"
        w={{ base: "100%", md: "15%" }}
      > */}
      <Box
        display={{
          base:
            !selectedChat && !openProfile && currentTab === "mychats"
              ? "flex"
              : "none",
          md: "flex",
        }}
        flexDirection="column"
        alignItems={"center"}
        p={3}
        color="white"
        backgroundColor="white"
        w={{ base: "100%", md: "15%" }}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        {/* main box */}
        <Box p={2}>
          <Box
            color={"black"}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            fontSize={"12px"}
            gap={2}
          >
            <Text>all users</Text>
            <Button>search</Button>
          </Box>
          <Divider color={"blue"} />
        </Box>
        {/* end of main box */}
        <Box
          color={"black"}
          pb={3}
          px={3}
          display="flex"
          fontSize={{ base: "20px", md: "20px" }}
          alignItems={"center"}
          // backgroundColor="#"
          w="100%"
          // alignItems={"center"}
          // w="100%"
          justifyContent={"space-between"}
        >
          <Text>chats</Text>

          <Button
            display={{
              base: "flex",
              md: "none",
            }}
            color="black"
            onClick={() => setCurrentTab("intrests")}
          >
            iiii
          </Button>
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
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        {/* <b>{chat.latestMessage.sender.name} : </b> */}
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                    {/* {chat.chatName} */}
                  </Box>
                ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
};

export default MyChats;
