import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const postData = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an image.",
        description: "We've created your account for you.",
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
      !newUser.username ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword ||
      !newUser.gender ||
      !newUser.dob
    ) {
      toast({
        title: "please fill in all the details.",
        // description: .",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "please check confirm password.",
        // description: .",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    registerUser(newUser, toast, setLoading, navigate);
  };

  return (
    <VStack spacing="5px" color={"b"}>
      <FormControl id="username" isRequired>
        <FormLabel>username</FormLabel>
        <Input
          placeholder="enter your username"
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          placeholder="enter your email"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </FormControl>
      <FormControl id="password" isRequired>
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
            <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
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
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="gender" isRequired>
        <FormLabel>gender</FormLabel>
        <Select
          placeholder="Select gender"
          onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </Select>
      </FormControl>
      <FormControl id="dob" isRequired>
        <FormLabel>input your date of birth</FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>upload picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) => postData(e.target.files[0])}
        />
      </FormControl>

      <Button
        color={"red"}
        width="100%"
        mt={15}
        onClick={handleSubmit}
        isLoading={loading}
      >
        sign up now
      </Button>
    </VStack>
  );
};

export default Signup;
