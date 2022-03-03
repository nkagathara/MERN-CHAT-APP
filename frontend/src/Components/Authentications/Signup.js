import { Button, FormControl, FormLabel, Input, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const[show,setShow] = useState(false); 
    const[name,setName] = useState(''); 
    const[email,setEmail] = useState(''); 
    const[password,setPassword] = useState(''); 
    const[confirmPassword,setConfirmPassword] = useState('');
    const[loading,setLoading] = useState(false);
    const[pic,setPic] = useState();
    const toast = useToast()
    const showPassword = () => setShow(!show);
    const history = useHistory();

    const setProfilePic = (file) =>{
        setLoading(true);
        if(file === undefined){
            toast({
                title: 'Please Select a Image!',
                status: 'warning',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
              })
            return;  
        }
        if(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'){
            const data = new FormData();
            data.append("file",file);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dliyxeg0g");
            fetch("https://api.cloudinary.com/v1_1/dliyxeg0g/image/upload",{
                method:'post',
                body:data,
            }).then((res)=> res.json())
            .then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
                setLoading(false);
            })            
        } else{
            toast({
                title: 'Please Select a Image!',
                status: 'warning',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
              })
            setLoading(false);  
            return; 
        }
        
    }

    const signUpHandler = async() =>{
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
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
        if(password !== confirmPassword){
            toast({
                title: 'Please Match the Password!',
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
            const { data } = await axios.post('/api/user',{name,email,password,pic},config);
            toast({
                title: 'Registeration Successful',
                status: 'success',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
              })
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push('/chats'); 

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
        }
    }

  return (
    <VStack spacing={2}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={e=>setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email' onChange={e=>setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>password</FormLabel>
            <Input placeholder='Enter Your Password' type={show ? 'text' : 'password'} onChange={(e)=> setPassword(e.target.value)}></Input>
            <InputRightElement height='6.50rem' width='4.5rem' onClick={showPassword}>
                <Button size="sm">{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input placeholder='Enter Your Confirm Password' type={show ? 'text' : 'password'} onChange={(e)=> setConfirmPassword(e.target.value)}></Input>
            <InputRightElement height='6.50rem' width='4.5rem' onClick={showPassword}>
                <Button size="sm">{show ? 'Hide' : 'Show'}</Button>
            </InputRightElement>
        </FormControl>
        <FormControl id='upload-pic'>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input pt="4px" type="file" accept='image/*' onChange={(e)=>setProfilePic(e.target.files[0])}/>
        </FormControl>
        <Button m={4} width="100%" colorScheme='blue' variant='solid' isLoading={loading} onClick={signUpHandler}>Sign Up</Button>
    </VStack>
    
  )
}

export default Signup