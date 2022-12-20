import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  Avatar,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/chatProvider";
import { useNavigate } from "react-router-dom";
import { acessChat, searchUser } from "../utils/apiCalls";
import ChatLoading from "./chatLoading";
import UserListItem from "./user/userListItem";

const SideDrawer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingChat, setloadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chatList,
    setChatList,
    // openProfile,
    setOpenProfile,
  } = ChatState();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = () => {
    if (!search) {
      toast({
        title: "search bar can not be empty",
        // status="warning",
        description: "enter a name",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      searchUser(user, search, toast, setLoading, setSearchResult);
    }
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
    <div style={{ backgroundColor: "red" }}>
      <Box
        bgColor={"whatsapp.200"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* seacrh bar  */}
        <Tooltip label="search users" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fa fa-search" aria-hidden="true"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              {" "}
              search users
            </Text>
          </Button>
        </Tooltip>
        {/* <Text>hello</Text> */}
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setOpenProfile(true)}>profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      {/* search drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}> search users</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Box display={"flex"} pb="2">
              <Input
                placeholder="search by name"
                mr={2}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => startChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner mr={"auto"} display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
