import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Img, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import { getSender } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
// import { fetchChats } from "../../utils/apiCalls";
import ChatLoading from "../chatLoading";
import IntrestModal from "../modals/intrestModal";
import { fetchAllIntrestsChats, handleAddUser } from "../../utils/apiCalls";
import JoinIntrestModal from "../modals/joinIntrestModal";
import logo from "../../images/logo.png";
const Intrests = ({
  loggedUser,
  setFetchAgain,
  FetchAgain,
  currentTab,
  setCurrentTab,
}) => {
  //   const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const {
    // user,
    // setUser,
    selectedChat,
    setSelectedChat,
    chatList,
    setChatList,
    user,
    openProfile,
    setOpenProfile,
    fetchAgain,
    // setOpenProfile,
    // setChatList,
  } = ChatState();
  const [allIntrest, setAllIntrest] = useState([]);
  useEffect(() => {
    if (loggedUser) {
      fetchAllIntrestsChats(loggedUser?.token, setAllIntrest, toast);
    }
  }, [loggedUser?.token, fetchAgain]);
  const handleJoinIntrestChat = (chat) => {
    handleAddUser(
      chat,
      user,
      toast,
      chatList,
      setChatList,
      // setLoading,
      setSelectedChat,
      setFetchAgain,
      FetchAgain
    );
  };
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
          base:
            !selectedChat && !openProfile && currentTab === "intrests"
              ? "flex"
              : "none",
          md: "flex",
        }}
        flexDirection="column"
        alignItems={"center"}
        p={3}
        backgroundColor="#882433"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth={"1px"}
        scrollBehavior="smooth"
        // overflowY={"scroll"}
        // height="100%"
      >
        <Box
          pb={3}
          px={3}
          display="flex"
          alignItems={"center"}
          backgroundColor="inherit"
          w="100%"
          color={"white"}
          justifyContent={"space-between"}
          // alignItems="center"}
        >
          <Box
            display="flex"
            justifyContent={"center"}
            gap={2}
            alignItems="center"
            height={"100%"}
          >
            <Img
              src={logo}
              alt="logo"
              // height={"10px"}
              width={"2.5rem"}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="sans-serif"
            >
              Classic
            </Text>
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            gap="10px"
          >
            <Button
              display={{
                base: "flex",
                md: "none",
              }}
              color="red"
              onClick={() => setCurrentTab("mychats")}
            >
              <Text color={"black"}>c</Text>
            </Button>
            <IntrestModal>
              <Button
                color={"black"}
                display={"flex"}
                fontSize={{ base: "10px", md: "10px", lg: "10px" }}
                rightIcon={<AddIcon />}
              >
                {/* create intrest */}
              </Button>
            </IntrestModal>
          </Box>
        </Box>

        <Box
          display="flex"
          p={3}
          w="100%"
          h="100%"
          mt={2}
          borderRadius={"lg"}
          overflowY="hidden"
          backgroundColor="#F8F8F8"
          flexDirection="column"
        >
          <Tabs isFitted variant="enclosed">
            <TabList bg="#882433">
              <Tab
                _selected={{ color: "white", opacity: "0.9" }}
                color={"white"}
              >
                my interests
              </Tab>
              <Tab
                _selected={{ color: "white", opacity: "0.7" }}
                color={"white"}
              >
                discover
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {chatList ? (
                  <Stack
                    overflowY={"scroll"}
                    scrollBehavior="smooth"
                    height={"100vh"}
                  >
                    {chatList
                      .filter((chat) => chat.isGroupChat === true)
                      .map((chat) => (
                        <Box
                          onClick={() => {
                            setSelectedChat(chat);
                            setOpenProfile(false);
                          }}
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
                                ? chat.latestMessage.content.substring(0, 51) +
                                  "..."
                                : chat.latestMessage.content}
                            </Text>
                          )}
                        </Box>
                      ))}
                  </Stack>
                ) : (
                  <ChatLoading />
                )}
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                {/* <p>two!</p> */}
                <Stack
                  overflowY={"scroll"}
                  scrollBehavior="smooth"
                  height={"100vh"}
                >
                  {allIntrest.map((chat) => (
                    <Box
                      key={chat._id}
                      color={
                        // "white"
                        // :
                        "black"
                      }
                      // onClick={() => {
                      //   ;
                      // }}
                      cursor={"pointer"}
                      bg={
                        // selectedChat === chat ?
                        // "#38B2AC"  :
                        "#E8E8E8"
                      }
                      // color={selectedChat === chat ? "white" : "black"}
                      px={3}
                      py={2}
                      marginY={1}
                      borderRadius="lg"
                    >
                      <JoinIntrestModal
                        handleJoin={handleJoinIntrestChat}
                        chat={chat}
                      >
                        <span>
                          <Text>{chat.chatName}</Text>
                        </span>
                      </JoinIntrestModal>
                    </Box>
                  ))}
                </Stack>
                {/* {allIntrest ? (
                  <Stack overflowY={"scroll"}> */}
                {/* {allIntrest
                      // .filter((chat) => chat.isGroupChat === true)
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
                                ? chat.latestMessage.content.substring(0, 51) +
                                  "..."
                                : chat.latestMessage.content}
                            </Text>
                           )} 
                        </Box>
                      ))}
                  </Stack>
                ) : (
                  <ChatLoading />
                )} */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default Intrests;
