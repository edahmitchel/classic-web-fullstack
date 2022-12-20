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
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../context/chatProvider";
import { updateUserDetails } from "../../utils/apiCalls";

export function UserDetailsModal({ children }) {
  const { user, setUser } = ChatState();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postData = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an image.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "classicwebcloud");
      data.append("cloud_name", "mitcheledah");
      fetch("https://api.cloudinary.com/v1_1/mitcheledah/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNewUser({ ...newUser, pic: data.url.toString() });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "please select an image.",
        description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const handleSubmit = () => {
    console.log(newUser);
    setLoading(true);

    if (
      !newUser
      // !newUser.username ||
      // !newUser.email ||
      // !newUser.password ||
      // !newUser.confirmPassword
    ) {
      toast({
        title: "please fill in your neccesary details.",
        // description: .",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // if (newUser.password !== newUser.confirmPassword) {
    //   toast({
    //     title: "please check confirm password.",
    //     // description: .",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    //   return;
    // }
    const filteredObject = Object.entries(newUser)
      .filter(([key, value]) => value)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    console.log("filter", filteredObject);
    updateUserDetails(filteredObject, toast, setLoading, user.token, setUser);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>edit profile details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5px" color={"b"}>
              <FormControl id="username" isRequired>
                <FormLabel>username</FormLabel>
                <Input
                  // value={user ? user.username : ""}
                  placeholder="enter your username"
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>email</FormLabel>
                <Input
                  placeholder="enter your email"
                  // value={user ? user.email : ""}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </FormControl>
              {/* <FormControl id="password" isRequired>
                <FormLabel>password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="enter your password"
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button
                      h="1.75rem"
                      size={"sm"}
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>confirm password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Retype Password"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button
                      h="1.75rem"
                      size={"sm"}
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl> */}
              {newProfilePic ? (
                <FormControl id="pic">
                  <FormLabel>upload picture</FormLabel>
                  <Input
                    type={"file"}
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postData(e.target.files[0])}
                  />
                </FormControl>
              ) : (
                <Text onClick={() => setNewProfilePic(true)}>
                  click if you also want to update your profile picture
                </Text>
              )}

              <Button
                color={"red"}
                width="100%"
                mt={15}
                onClick={handleSubmit}
                isLoading={loading}
              >
                edit profile
              </Button>
            </VStack>
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
