import { Box, useToast } from "@chakra-ui/react";
// import { useEffect } from "react"
import ChatBox from "../components/misc/chatBox";
import MyChats from "../components/myChats";
import SideDrawer from "../components/header";
import { ChatState } from "../context/chatProvider"
import Intrests from "../components/intrests/intrests";
import { fetchChats } from "../utils/apiCalls";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState();
    const [loggedUser, setLoggedUser] = useState();
    const { user, setChatList } = ChatState()
    const [currentTab, setCurrentTab] = useState("");
    // const token = user.token;
    const toast = useToast()
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        if (user) { fetchChats(user?.token, setChatList, toast) };
        setCurrentTab("intrests")
        return () => { };
    }, [user, setChatList, toast, fetchAgain]);
    console.log(user);


    return (
        <div style={{ width: "100%" }} >
            {/* {user && <SideDrawer />} */}
            <Box display="flex" justifyContent="space-between"
                w="100%" h="100vh" p="10px">
                {/* hello */}
                {/* {user.token} */}
                {user &&


                    <Intrests currentTab={currentTab} setCurrentTab={setCurrentTab} loggedUser={loggedUser} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <ChatBox loggedUser={loggedUser} />}
                {user && <MyChats currentTab={currentTab} setCurrentTab={setCurrentTab} loggedUser={loggedUser} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
            {/* {user?.email} */}

        </div>
    )
}

export default ChatPage
