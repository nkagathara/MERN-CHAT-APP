import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../Components/Authentications/Login'
import Signup from '../Components/Authentications/Signup'

const HomePage = () => {
  const history = useHistory();
  useEffect(()=>{
    const user = localStorage.getItem("userInfo");

    if(user){
      history.push("/chats");
    }
  },[history])
  return (
    <Container>
      <Box d="flex" p={1} background="white" justifyContent="center" borderRadius="lg" borderWidth="1px" textAlign="center" w="100%" m="40px 0 15px 0">
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
      </Box>
      <Box bg="white" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
      <TabList mb={1}>
        <Tab width="50%">Login</Tab>
        <Tab width="50%">Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Signup />
        </TabPanel>
      </TabPanels>
    </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage