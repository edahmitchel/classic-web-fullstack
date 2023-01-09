import React, { useState } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useToast,
  FormControl,
  Input,
  // Lorem,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../context/chatProvider";

const IntrestModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [intrestName, setIntrestName] = useState("");
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState("");
  // const [loading, setLoading] = useState();
  const toast = useToast();
  const { user, chatList, setChatList } = ChatState();
  // console.log(chatList);
  const handleSubmit = async () => {
    if (!intrestName) {
      toast({
        title: "Please fill intrest name",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://classicweb.onrender.com/api/chat/intrest`,
        {
          name: intrestName,
          // users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      if (data) setChatList([data, ...chatList]);
      onClose();
      toast({
        title: "New interest Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create interest!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"30px"}
            fontFamily="sans-serif"
            display={"flex"}
            justifyContent="center"
          >
            create interest
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder=" Interest Name"
                mb={3}
                onChange={(e) => setIntrestName(e.target.value.toLowerCase())}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              create It
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              next time
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IntrestModal;
