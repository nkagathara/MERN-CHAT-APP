import { Button, FormControl, FormLabel, Input, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const[show,SetShow] = useState(false); 
    const[name,SetName] = useState(''); 
    const[email,SetEmail] = useState(''); 
    const[password,SetPassword] = useState(''); 
    const[confirmPassword,SetConfirmPassword] = useState(''); 

    const showPassword = () => SetShow(!show);

    const setProfilePic = (file) =>{
        console.log("file::",file);
    }

    const signUpHandler = () =>{

    }

  return (
    <VStack spacing={2}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={e=>SetName(e.target.value)}></Input>
        </FormControl>
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
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input placeholder='Enter Your Confirm Password' type={show ? 'text' : 'password'} onChange={(e)=> SetConfirmPassword(e.target.value)}></Input>
            <InputRightElement height='6.50rem' width='4.5rem' onClick={showPassword}>
                <Button size="sm">{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
        </FormControl>
        <FormControl id='upload-pic'>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input pt="4px" type="file" accept='image/*' onChange={(e)=>setProfilePic(e.target.files[0])}/>
        </FormControl>
        <Button m={4} width="100%" colorScheme='blue' variant='solid' onSubmit={signUpHandler}>Sign Up</Button>
    </VStack>
    
  )
}

export default Signup