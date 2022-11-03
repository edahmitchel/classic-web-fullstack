import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/chatProvider";
import SingleChat from "./singleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <>
      <Box
        display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        alignItems={"center"}
        p={3}
        backgroundColor="whatsapp.200"
        w={{ base: "100%", md: "52%" }}
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        CHATBOX
      </Box>
    </>
  );
};

export default ChatBox;
