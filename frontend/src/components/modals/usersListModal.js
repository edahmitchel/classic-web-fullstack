import { InfoIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { acessChat } from "../../utils/apiCalls";
import UserListItem from "../user/userListItem";
export function UsersListModal({ children, usersList }) {
  const [loadingChat, setloadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const {
    setFetchAgain,
    user,
    selectedChat,
    setSelectedChat,
    chatList,
    setChatList,
    fetchAgain,
  } = ChatState();
  const toast = useToast();

  const handleRemove = async (close) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `https://classicweb.onrender.com/api/chat/intrest/delete`,
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
        config
      );
      console.log({ this: data });
      //   setFetchAgain(!fetchAgain);
      //   fetchMessages();

      setLoading(false);
      setSelectedChat(null);
      setFetchAgain(!fetchAgain);

      toast({
        title: "left intrest",
        // description: error.response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      close();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setFetchAgain(!fetchAgain);
      setLoading(false);
    }
    // close();
  };
  const startChat = (userId) => {
    const { token } = user;
    acessChat(
      userId,
      token,
      toast,
      setSelectedChat,
      setloadingChat,
      onClose,
      chatList,
      setChatList
    );
  };
  return (
    <>
      {/* <span onClick={onOpen}>{children}</span> */}
      <Button onClick={onOpen}>
        <InfoIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {usersList
                .filter((users) => users._id !== user._id)
                .map((singleUser) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => startChat(user._id)}
                  />
                ))}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {loadingChat && <Spinner mr={"auto"} display="flex" />}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              variant="ghost"
              onClick={() => {
                handleRemove(onClose);
              }}
            >
              leave interest
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
