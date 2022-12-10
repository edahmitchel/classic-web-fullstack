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
import SingleChat from "./singleChat";
import { Userprofile } from "./userprofile";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const [openProfile, setOpenProfile] = useState(true);

  const { selectedChat } = ChatState();
  return (
    <>
      <VStack>
        <Box>
          <Box width={"100%"}>
            <Image
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              w={"100%"}
            />
          </Box>
          <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole">
            <AvatarBadge borderColor="papayawhip" boxSize="1.25em">
              <EditIcon />
            </AvatarBadge>
          </Avatar>
          <Text>name</Text>
        </Box>
        <Box
          display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
          flexDirection="column"
          alignItems={"center"}
          p={3}
          backgroundColor="white"
          w={{ base: "100%", md: "52%" }}
          borderRadius="lg"
          borderWidth={"1px"}
        >
          {openProfile ? (
            <Userprofile />
          ) : (
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
          {/* CHATBOX */}
        </Box>
      </VStack>
    </>
  );
};

export default ChatBox;
