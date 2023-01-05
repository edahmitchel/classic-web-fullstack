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
  //   useToast,
  FormControl,
  Input,
  // Lorem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export const Userdatamodal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function UpdateUserForm(props) {
    // Create state variables for the form fields
    const [userUpdate, setUserUpdate] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");

    // Function to handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Send a PATCH request to the server to update the user details
      try {
        const response = await axios.patch(
          `https://classicweb.onrender.com/api/users`,
          {
            name,
            email,
            pic,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        {children ? <span onClick={onOpen}>{children}</span> : ""}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"30px"}
              fontFamily="sans-serif"
              display={"flex"}
              justifyContent="center"
            >
              edit
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
            >
              <FormControl>
                <Input
                  // placeholder={}
                  mb={3}
                  //   onChange={(e) => setIntrestName(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue">
                save changes
              </Button>
              <Button variant={"ghost"} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};
