import { Container, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

export const MyCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, images]);

  return (
    <Container
      overflow={"hidden"}
      padding={2}
      alignItems="center"
      display={"flex"}
      justifyContent="center"
      marginTop={"100px"}
    >
      <Carousel
        axis="vertical"
        showThumbs={false}
        showStatus={false}
        showIndicators={images.length > 1}
        selectedItem={index}
        onChange={setIndex}
        infiniteLoop
        autoPlay
      >
        {images.map((image, i) => (
          <Image key={i} src={image} alt="" style={{ width: "100%" }} />
        ))}
      </Carousel>
    </Container>
  );
};
