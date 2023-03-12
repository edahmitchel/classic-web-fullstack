import { Avatar, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
// import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogic";
import { ChatState } from "../context/chatProvider";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const messagesEnd = useRef(null);
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {/* <ScrollableFeed> */}
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {/* {isSameSender(messages, m, i, user._id) ||
              (isLastMessage(messages, i, user._id) && (
                <Tooltip
                  label={
                    m.sender._id
                    // m.sender.username
                  }
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor={"pointer"}
                    name={m.sender.username}
                    src={m.sender.pic}
                  />
                </Tooltip>
              ))} */}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
              <span>
                {isSameSender(messages, m, i, user._id) ? (
                  <Text fontSize={"1em"}>
                    user:
                    {
                      m?.anonymousId?.anonymousId

                      // .sender.username
                    }
                  </Text>
                ) : (
                  <></>
                )}
              </span>
            </span>
          </div>
        ))}
      <div style={{ height: "80vh" }} ref={messagesEnd}></div>
      {/* </ScrollableFeed> */}
    </>
  );
};

export default ScrollableChat;
