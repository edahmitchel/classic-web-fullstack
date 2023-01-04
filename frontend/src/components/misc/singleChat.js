import { ArrowBackIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { Lottie } from "@lottiefiles/lottie-js";
import image1 from "../../images/slider-one.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
import ScrollableChat from "../scrollableChat";
import ProfileComp from "./profileComp";
import io from "socket.io-client";
// import animationData from "../../animation/52671-typing-animation-in-chat.json";
const ENDPOINT = "https://classicweb.onrender.com";
// "https://classic-web-chat.herokuapp.com";
// "http://192.168.0.144:5000";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  useEffect(() => {
    if (user) {
      socket = io.connect(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => {
        console.log("socket connected");
        setSocketConnected(true);
      });
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [user]);
  const sendMessage = async (e) => {
    if (e.key === "Enter" || e.target.id === "submitBtn") {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://classicweb.onrender.com/api/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setMessages([...messages, data]);
        socket.emit("new message", data);
        console.log("sent new message");

        console.log(data);
      } catch (error) {
        console.log("found", error);
        // toast({
        //   title: "Error Occured!",
        //   description: error.message,
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "bottom",
        // });
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
        `https://classicweb.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
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
    if (!socketConnected) {
      console.log("socket not connected");
      return;
    }
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("new message recieved here");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // ?notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
            position="relative"
            display={"flex"}
            flexDirection="column"
            justifyContent={"flex-end"}
            p={3}
            bg="white"
            w="100%"
            // h="%"
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
              // <>
              //   <div>{/* {messages} */}</div>
              // </>
              <Box
                display={"flex"}
                flexDirection="column"
                overflowY={"scroll"}
                // scrollbar width change to none in css
              >
                <ScrollableChat messages={messages} />
                {/* MESSAGES */}
              </Box>
            )}
            <Box position={"absolute"} bottom="0" mt={3} w="98%">
              <FormControl
                onKeyDown={sendMessage}
                isRequired
                backgroundColor={"white"}

                // w="inherit"
              >
                {istyping ? <div>loading...</div> : <></>}
                <InputGroup>
                  <Input
                    placeholder={"Type your message"}
                    value={newMessage}
                    onChange={typingHandler}
                  />
                  <InputRightElement>
                    <ArrowRightIcon
                      id="submitBtn"
                      onClick={sendMessage}
                      color={"882433"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          flexDirection="column"
          h="100%"
        >
          <Img src={image1} alt="interests" />
          <Text fontSize={"3xl"} pb={3}>
            create or discover interests to connect
          </Text>
        </Box>
      )}
      {/* SingleChat */}
    </>
  );
};

export default SingleChat;
