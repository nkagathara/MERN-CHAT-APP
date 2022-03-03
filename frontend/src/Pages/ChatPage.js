import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../Context/chatProvider';
import SideDrawer from '../Components/Miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';
import MyChats from '../Components/Miscellaneous/MyChats';
import ChatBox from '../Components/Miscellaneous/ChatBox';

const ChatPage = () => {
  const {user} = ChatState();
  console.log("user::",user);
  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage