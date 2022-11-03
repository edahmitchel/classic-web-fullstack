import { Box, useToast } from "@chakra-ui/react";
// import { useEffect } from "react"
import ChatBox from "../components/misc/chatBox";
import MyChats from "../components/misc/myChats";
import SideDrawer from "../components/misc/header";
import { ChatState } from "../context/chatProvider"
import Intrests from "../components/misc/intrests";
import { fetchChats } from "../utils/apiCalls";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState();
    const [loggedUser, setLoggedUser] = useState();
    const { user, setChatList } = ChatState()
    // const token = user.token;
    const toast = useToast()
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats(user?.token, setChatList, toast);

        return () => { };
    }, [user?.token, setChatList, toast]);
    console.log(user);


    return (
        <div style={{ width: "100%" }} >
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between"
                w="100%" h="92vh" p="10px">
                {/* hello */}
                {/* {user.token} */}
                {user && <Intrests loggedUser={loggedUser} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <ChatBox loggedUser={loggedUser} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <MyChats loggedUser={loggedUser} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
            {user?.email}

        </div>
    )
}

export default ChatPage
