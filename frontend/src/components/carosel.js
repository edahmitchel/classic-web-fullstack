import { Box, Container, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import image1 from "../images/slider-one.png";
import image2 from "../images/slider-two.png";

// export Carousel = [
//   {
//     image: image1,
//     text1: "Create or Discover",
//     text2: "create your interests or discover new ",
//     text3: "ones to find others who share",
//     text4: "your curiosities",
//   },
//   {
//     image: image2,
//     text1: "Connect with Anyone",
//     text2: "connect and chat with anyone, no prior contact ",
//     text3: "ones to find others who share",
//     text4: "your curiosities",
//   },
//   {
//     image: image1,
//     text1: "Create or Discover",
//     text2: "create your interests or discover new ",
//     text3: "e.g. Phone Number ",
//     text4: "e-mail, etc. needed",
//   },
// ]
export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      image: image1,
      text1: "Create or Discover",
      text2: "create your interests or discover new ",
      text3: "ones to find others who share",
      text4: "your curiosities",
    },
    {
      image: image2,
      text1: "Connect with Anyone",
      text2: "connect and chat with anyone, no prior contact ",
      text3: "ones to find others who share",
      text4: "your curiosities",
    },
    {
      image: image1,
      text1: "Create or Discover",
      text2: "create your interests or discover new ",
      text3: "e.g. Phone Number ",
      text4: "e-mail, etc. needed",
    },
  ];
  // setInterval(() => {
  //   if (currentIndex === 2) {
  //     setCurrentIndex(0);
  //   } else {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // }, 5000);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };
  const item = items[0];
  return (
    <>
      <Stack>
        <Box>
          <Container width="300px" height={"200px"} padding={3}>
            <Image
              src={item?.image}
              alt="First slide"
              width={"100%"}
              height="100%"
            />
          </Container>
          <Box textAlign={"center"} marginTop={2}>
            <Text padding={1} fontWeight="bold">
              {item?.text1}
            </Text>
            <Text>
              {item?.text2} <br />
              {item?.text3} <br />
              {item?.text4}
            </Text>
          </Box>
        </Box>
      </Stack>
      <Box>
        <button onClick={() => setCurrentIndex(0)}>first</button>
        <button onClick={() => setCurrentIndex(1)}>second</button>
        <button onClick={() => setCurrentIndex(2)}>third</button>
      </Box>
    </>
  );
};
