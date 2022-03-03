import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, toast, Tooltip, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'    
import { ChatState } from '../../Context/chatProvider';
import ProfileDialog from './ProfileDialog';
import { useHistory } from 'react-router-dom';
import {useDisclosure} from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
    const[search,setSearch] = useState("");
    const[searchResult,setSearchResult] = useState([]);
    const[loading,setLoading] = useState(false);
    const[loadingChat,setLoadingChat] = useState();
    const toast = useToast();
    const {user, chats, setChats, setSelectedChat} = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logOutHandler = () =>{
        localStorage.removeItem("userInfo");
        toast({
            title: 'Logout Successfully',
            status: 'success',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          })
        history.push("/");
    }

    const handleSearch = async() =>{
        if(!search){
            toast({
                title: 'Please enter something in search',
                status: 'warning',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`,config);
            if(!chats.find(user=> user._id === data._id)){
                setChats([data,...chats]);
            }
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Faild to load the search result',
                status: 'error',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
            })
            return;
        }
    }

    const accessChat = async(userId) =>{
        setLoadingChat(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
            };

            const {data} = await axios.post(`/api/chat`,{userId},config);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: 'Error Fetching the chat',
                description: 'error.message',
                status: 'error',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
            })
        }
    }

  return (
    <div>
        <Box d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
            <Button variant="ghost" onClick={onOpen}>
                <i className="fas fa-search"></i>
                <Text d={{base:'none', md:"flex"}} px="4">Search User</Text>
            </Button>
        </Tooltip>   
        <Text fontSize='2xl' fontFamily='work sans'>
            Talk-A-Tive
        </Text>
        <div>
            <Menu>
                <MenuButton p={1} >
                    <BellIcon fontSize="2xl" m={1}/>
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                    <ProfileDialog user={user}>
                        <MenuItem>My Profile</MenuItem>
                    </ProfileDialog>
                    <MenuItem onClick={logOutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
        </Box>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader borderBottomWidth={2}>Search Users</DrawerHeader>

            <DrawerBody>
                <Box d='flex' pb={2}>
                <Input value={search} mr={2} onChange={(e)=>setSearch(e.target.value)} placeholder='Search by name or email' />
                <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading ? ( 
                    <ChatLoading />
                 ) :(
                    searchResult?.map(user=>(
                        <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)} />
                        
                    ))
                 )   
                }
                {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>

            
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default SideDrawer