import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { getSender, getSenderFull } from "../../config/chatLogic";
import { ChatState } from "../../context/chatProvider";
import ProfileComp from "./profileComp";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
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
          ></Box>
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
