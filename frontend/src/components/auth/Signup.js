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
} from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({});
  const postData = (pics) => {};
  const handleSubmit = () => {
    console.log(newUser);
  };
  return (
    <VStack spacing="5px" color={"b"}>
      <FormControl id="username" isRequired>
        <FormLabel>username</FormLabel>
        <Input
          placeholder="enter your username"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
        <FormLabel>password</FormLabel>
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

      <Button color={"red"} width="100%" mt={15} onClick={handleSubmit}>
        sign up now
      </Button>
    </VStack>
  );
};

export default Signup;
