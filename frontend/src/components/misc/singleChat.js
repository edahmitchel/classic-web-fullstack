import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
import { sendMessageCall } from "../../utils/apiCalls";
import ScrollableChat from "../scrollableChat";
import ProfileComp from "./profileComp";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = async (e) => {
    if (e.key === "Enter") {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setNewMessage("");
        setMessages([...messages, data]);
        console.log(data);
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
    }
  };
  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);
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

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicatoer logic
  };
  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"work sans"}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileComp user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              selectedChat.chatName.toUpperCase()
            )}
            {/* messages */}
          </Text>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"flex-end"}
            p={3}
            bg="white"
            w="100%"
            h="100%"
            borderRadius={"lg"}
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf="center"
                margin={"auto"}
              />
            ) : (
              <>
                <div>{/* {messages} */}</div>
              </>
            )}
            <Box
              display={"flex"}
              flexDirection="column"
              overflowY={"scroll"}
              // scrollbar width change to none in css
            >
              <ScrollableChat messages={messages} />
              {/* MESSAGES */}
            </Box>
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                placeholder={"Type your message"}
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          h="100%"
        >
          <Text fontSize={"3xl"} pb={3}>
            click on chat to start conversation
          </Text>
        </Box>
      )}
      SingleChat
    </>
  );
};

export default SingleChat;
