import { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
      setTranslateValue(-100 * (images.length - 1));
    } else {
      setCurrentIndex(currentIndex - 1);
      setTranslateValue(translateValue + 100);
    }
  };

  const handleNextClick = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      setTranslateValue(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTranslateValue(translateValue - 100);
    }
  };

  return (
    <div className="carousel-container">
      <button onClick={handlePrevClick} className="carousel-btn prev">
        Prev
      </button>
      <div
        className="carousel-slider"
        // style={{ transform: "translateX(${translateValue}%)" }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt="carousel" />
        ))}
      </div>
      <button onClick={handleNextClick} className="carousel-btn next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
