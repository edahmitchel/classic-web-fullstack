import React from 'react'
import { Container, Box, Text } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            navigate("/chats");
        }

    })

    return (
        <Container maxW={"8xl"} display={"flex"} border="1px solid black">
            <Container maxW="2xl" width={"100%"} centerContent bg={"beige"} display={{
                base: "none",
                md: "flex",
            }}>
                < Box display='flex' justifyContent='center' padding={3} bg="GrayText" m="40px 0 15px 0" borderRadius="lg" borderwidth="1px">

                    <Text>

                        carousel
                    </Text>
                </Box>
            </Container>
            <Container border="1px solid black" maxW="2xl" w='100%' centerContent>
                <Box w="100%" display='flex' justifyContent='center' padding={3} bg="whatsapp.200" m="40px 0 15px 0" borderRadius="lg" borderwidth="1px">


                    <Text fontSize={"xl"}>classic-web homepage </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth={'1px'} color='black'>
                    <Tabs variant='soft-rounded'>
                        <TabList mb='1em'>
                            <Tab w='50%'>login</Tab>
                            <Tab w="50%">signup</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs></Box>
            </Container>


        </Container>
    )
}

export default HomePage
