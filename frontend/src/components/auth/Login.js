import React from "react";
import { useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  useNavigate,
  //  useLocation
} from "react-router-dom";
import { loginUser } from "../../utils/apiCalls";
const Login = ({ setCurrentTab }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const toast = useToast();
  const handleSubmit = () => {
    // console.log(user);
    // console.log(user);
    // console.log(newUser);
    setLoading(true);

    if (!user.username || !user.password) {
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

    loginUser(user, toast, setLoading, navigate);
  };

  return (
    <>
      <Stack>
        <FormControl id="loginusername" isRequired>
          <FormLabel>username</FormLabel>
          <Input
            placeholder="enter your username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </FormControl>
        {/* <FormControl id="email" isRequired>
          <FormLabel>email</FormLabel>
          <Input
            placeholder="enter your email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </FormControl> */}
        <FormControl id="loginpassword" isRequired>
          <FormLabel>password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="enter your password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          color={"#882433"}
          width="100%"
          mt={"30px"}
          onClick={handleSubmit}
          isLoading={loading}
        >
          login
        </Button>
        <Box textAlign={"center"}>
          <Text
            color={"#882433"}
            _hover={{ color: "black", cursor: "pointer" }}
            onClick={() => setCurrentTab("forget")}
          >
            forgot password?
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default Login;
