import { Button, FormControl, FormLabel, Input, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [show,SetShow] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const showPassword = () => SetShow(!show);
    const history = useHistory();

    const loginHandler = async() =>{
        setLoading(true);
        if(!email || !password){
            toast({
                title: 'Please Fill all the Fields!',
                status: 'warning',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
              })
            setLoading(false);  
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type" : "application/json",
                },
            };
            const {data} = await axios.post('/api/user/login',{email,password},config);
            toast({
                title: 'Login Successful',
                status: 'success',
                position: 'top-right',
                duration: 2000,
                isClosable: true,
              })
            setLoading(false);
            localStorage.setItem("userInfo", JSON.stringify(data));
            history.push('/chats');  
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
              setLoading(false);
        }
    }

    const guestUserHandler = () =>{

    }

  return (
    <VStack spacing={2}>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input value={email} placeholder='Enter Your Email' onChange={e=>setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>password</FormLabel>
            <Input value={password} placeholder='Enter Your Password' type={show ? 'text' : 'password'} onChange={(e)=> setPassword(e.target.value)}></Input>
            <InputRightElement height='6.50rem' width='4.5rem' onClick={showPassword}>
                <Button size="sm">{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
        </FormControl>
        <Button m={4} width="100%" colorScheme='blue' variant='solid' isLoading={loading} onClick={loginHandler}>Login</Button>
        <Button m={4} width="100%" colorScheme='red' variant='solid' onClick={() => {setEmail('guest@gmail.com');setPassword('123456')}}>Get Guest User Credentials</Button>
    </VStack>
  )
}

export default Login