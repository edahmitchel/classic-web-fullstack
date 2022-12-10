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
import React from "react";

const Userdatamodal = ({ children, field }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            edit {field}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder={`edit ${field}`}
                mb={3}
                //   onChange={(e) => setIntrestName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              //  onClick={handleSubmit}
              colorScheme="blue"
            >
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
};

export default Userdatamodal;
