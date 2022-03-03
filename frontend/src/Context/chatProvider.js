import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

export const ChatContext = React.createContext();

const ChatProvider = ({children}) =>{
    const [user,SetUser] = useState();
    const [selectedChat, setSelectedChat]= useState(); 
    const [chats, setChats]= useState(); 

    const history = useHistory();

    useEffect(() =>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        SetUser(userInfo);
        
        if(!userInfo){
            history.push("/");
        }
    },[history])

    return <ChatContext.Provider value={{user,SetUser, selectedChat, setSelectedChat, chats, setChats}}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () =>{
    return useContext(ChatContext);
}
export default ChatProvider;