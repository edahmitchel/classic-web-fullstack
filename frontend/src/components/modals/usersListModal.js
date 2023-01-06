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
} from "@chakra-ui/react";
export function UsersListModal({ children, usersList, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                  <Text key={singleUser._id} padding={2}>
                    {singleUser.username}
                  </Text>
                ))}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
