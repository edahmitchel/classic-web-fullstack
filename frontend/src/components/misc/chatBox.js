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
      {/* <VStack w={"100%"} border="2px solid purple"> */}
      <Box
        display={{
          base: selectedChat || openProfile ? "flex" : "none",
          md: "flex",
        }}
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
          <Box w="100%">
            <Danieluser />
          </Box>
        ) : (
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      {/* </VStack> */}
    </>
  );
};

export default ChatBox;
