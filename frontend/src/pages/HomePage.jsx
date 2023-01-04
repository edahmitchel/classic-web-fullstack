import React from 'react'
import { Container, Box, Text, Image } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Carousel } from '../components/carosel'
import logo from "../images/logo.png"
import ForgetPassword from '../components/auth/forgetPassword'
import { useState } from 'react'
const HomePage = () => {
    const [currentTab, setCurrentTab] = useState("auth")
    const navigate = useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            navigate("/chats");
        }

    })

    return (
        <Container maxW={"8xl"} display={"flex"} >
            <Container maxW="2xl" width={"100%"} alignItems="center" justifyContent={"center"} centerContent display={{
                base: "none",
                md: "flex",
            }}>


                {/*  */}


                <Carousel />
                {/* <MyCarousel /> */}

            </Container>
            <Container maxW="2xl" w='100%' centerContent>
                <Box w="100%" display='flex' justifyContent='center' padding={3} m="40px 0 15px 0" borderRadius="lg" borderwidth="1px">

                    <Box display={"flex"} alignItems="center">

                        <Text fontSize={"xl"}>Welcome to classic web!</Text>
                        <Box marginLeft={"0.5rem"} width={"30px"}>

                            <Image src={logo} />
                        </Box>
                    </Box>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth={'1px'} color='black'>
                    {currentTab === "auth" ?

                        (<Tabs variant='soft-rounded' colorScheme={"#882433"}>
                            <TabList mb='1em'>
                                <Tab margin={1} w='50%' _selected={{ color: "white", opacity: "0.9", backgroundColor: "#882433" }}
                                    color={"#882433"} border="1px solid #882433" >login</Tab>
                                <Tab w="50%" margin={1} _selected={{ color: "white", opacity: "0.9", backgroundColor: "#882433" }}
                                    color={"#882433"} border="1px solid #882433">signup</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Login setCurrentTab={setCurrentTab} />
                                </TabPanel>
                                <TabPanel>
                                    <Signup />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>) :
                        <ForgetPassword setCurrentTab={setCurrentTab} />
                    }
                </Box>
            </Container>


        </Container>
    )
}

export default HomePage
