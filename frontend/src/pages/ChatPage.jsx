import { Box } from "@chakra-ui/react";
import { useEffect } from "react"
import ChatBox from "../components/misc/chatBox";
import MyChats from "../components/misc/myChats";
import SideDrawer from "../components/misc/header";
import { ChatState } from "../context/chatProvider"

const ChatPage = () => {
    const { user } = ChatState()
    console.log(user);


    return (
        <div style={{ width: "100%" }} >
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between"
                w="100%" h="92vh" p="10px">

                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
            {user?.email}

        </div>
    )
}

export default ChatPage
