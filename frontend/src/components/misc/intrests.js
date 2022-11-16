import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
// import { getSender } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
// import { fetchChats } from "../../utils/apiCalls";
import ChatLoading from "../chatLoading";
import IntrestModal from "./intrestModal";

const Intrests = ({ loggedUser }) => {
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
        display={{
          base: selectedChat ? "none" : "flex",
          md: "flex",
        }}
        flexDirection="column"
        alignItems={"center"}
        p={3}
        backgroundColor="whatsapp.200"
        w={{ base: "100%", md: "31%" }}
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
          justifyContent={"space-between"}
          // alignItems="center"}
        >
          intrests
          <IntrestModal>
            <Button
              display={"flex"}
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              {/* create intrest */}
            </Button>
          </IntrestModal>
        </Box>
        <Box
          display="flex"
          p={3}
          w="100%"
          h="100%"
          borderRadius={"lg"}
          overflowY="hidden"
          backgroundColor="#F8F8F8"
          flexDirection="column"
        >
          {chatList ? (
            <Stack overflowY={"scroll"}>
              {chatList
                .filter((chat) => chat.isGroupChat === true)
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
                    <Text>{chat.chatName}</Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.username} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
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

export default Intrests;
