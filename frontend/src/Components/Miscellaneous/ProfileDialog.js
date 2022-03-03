import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileDialog = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ):(
            <IconButton d={{base:"flex"}} icon={<ViewIcon />} onClick={onOpen}/>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent height='400px'>
                <ModalHeader fontSize="40px" fontFamily="work sans" d="flex" justifyContent="center">{user.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <Image borderRadius='full' boxSize="150px" src={user.pic} alt={user.name}></Image>
                    <Text mt="30px" fontSize={{base: "28px" , md:"30px"}} fontFamily='work sans'>
                        Email:{user.email}
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ProfileDialog