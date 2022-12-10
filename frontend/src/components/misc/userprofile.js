// import React, { useState } from "react";
import {
  VStack,
  //   FormControl,
  //   FormLabel,
  //   Input,
  //   InputGroup,
  //   InputRightElement,
  //   Button,
  //   Select,
  //   useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChatState } from "../../context/chatProvider";
export const Userprofile = () => {
  const { user } = ChatState();
  return (
    <>
      <VStack>
        <Box
          display={"flex"}
          alignContent="center"
          justifyContent={"space-between"}
        >
          <Box>
            <Text>edit description</Text>
            <Text>{user.username}</Text>
          </Box>
          <Text>edit</Text>
        </Box>
        <Box
          display={"flex"}
          alignContent="center"
          justifyContent={"space-between"}
        >
          <Box w="100%">
            <Text>email</Text>
            <Text>{user.email}</Text>
          </Box>
          <Text>edit</Text>
        </Box>
        <Box
          display={"flex"}
          alignContent="center"
          justifyContent={"space-between"}
        >
          <Box>
            <Text>location</Text>
            <Text>san fransico</Text>
          </Box>
          <Text>edit</Text>
        </Box>
      </VStack>
    </>
  );
};
