import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
const ChatPage = () => {
    const [chats, setChats] = useState([])
    const fetchData = async () => {
        const { data } = await axios("/api/chat")
        // console.log("here")
        setChats(data)
    }
    useEffect(() => {
        fetchData()


    }, [])

    return (
        <div>
            {chats.map(chat => <p key={chat._id}>{chat.chatName}</p>)}
            chatpage

        </div>
    )
}

export default ChatPage
