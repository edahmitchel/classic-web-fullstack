import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Image,
  VStack,
  AvatarBadge,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import Danieluser from "./danieluser";
import SingleChat from "./singleChat";
import { Userprofile } from "./userprofile";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, openProfile, setOpenProfile, user } = ChatState();
  return (
    <>
      <VStack w={"100%"} border="2px solid purple">
        {/* <Box w={"100%"} border="2px solid red">
          <Box width={"100%"} border="2px solid blue" h="30vh">
            <Image
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              w={"100%"}
              height="100%"
              objectFit={"cover"}
              objectPosition="center"
              border="2px solid black"
            />
          </Box>
          <Box
            display={"flex"}
            w="100%"
            position={"relative"}
            justifyItems={"end"}
            // border="1px solid red"
            height={"70px"}
          >
            <Avatar
              justifySelf={"flex-end"}
              position={"absolute"}
              right={0}
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
              mt="-40px"
            >
              <AvatarBadge borderColor="papayawhip" boxSize="1.25em">
                <EditIcon />
              </AvatarBadge>
            </Avatar>
            <Text position={"absolute"} right={0} mt="10px">
              name
            </Text>
          </Box>
        </Box>
        <Box
          display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
          flexDirection="column"
          alignItems={"center"}
          p={3}
          h="100vh"
          backgroundColor="white"
          w={{ base: "100%", md: "100%" }}
          borderRadius="lg"
          borderWidth={"1px"}
        >
          {openProfile ? (
          ) : ( */}
        {/* <Userprofile /> */}
        <Box w="100%">
          <Danieluser />
        </Box>
        {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
        {/* )} */}
        {/* CHATBOX */}
        {/* </Box> */}
      </VStack>
    </>
  );
};

export default ChatBox;
