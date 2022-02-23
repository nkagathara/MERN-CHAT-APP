import { Button, FormControl, FormLabel, Input, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
    const [show,SetShow] = useState(false);
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');

    const showPassword = () => SetShow(!show);

    const loginHandler = () =>{

    }

    const guestUserHandler = () =>{

    }

  return (
    <VStack spacing={2}>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' onChange={e=>SetEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>password</FormLabel>
            <Input placeholder='Enter Your Password' type={show ? 'text' : 'password'} onChange={(e)=> SetPassword(e.target.value)}></Input>
            <InputRightElement height='6.50rem' width='4.5rem' onClick={showPassword}>
                <Button size="sm">{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
        </FormControl>
        <Button m={4} width="100%" colorScheme='blue' variant='solid' onSubmit={loginHandler}>Login</Button>
        <Button m={4} width="100%" colorScheme='red' variant='solid' onSubmit={guestUserHandler}>Get Guest User Credentials</Button>
    </VStack>
  )
}

export default Login