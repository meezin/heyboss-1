import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom' ;
import Slide from './slide.component'

export default function Carousel({ slides }) {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    // useEffect(() => {
    //   const handleScroll = (event) => {
    //     if (event.deltaY > 0) {
    //       nextSlide();
    //     } else {
    //       previousSlide();
    //     }
    //   };
  
    //   window.addEventListener('wheel', handleScroll);
  
    //   // Clean up the event listener when the component unmounts
    //   return () => {
    //     window.removeEventListener('wheel', handleScroll);
    //   };
    // }, [current]); // Dependencies array has 'current' to ensure we have the latest slide index
  
  
    const previousSlide = () => {
      let newCurrent = current === 0 ? slides.length - 1 : current - 1;
      setCurrent(newCurrent);
      // Update the URL
      navigate(slides[newCurrent].destination);
    };
  
    const nextSlide = () => {
      let newCurrent = current === slides.length - 1 ? 0 : current + 1;
      setCurrent(newCurrent);
      // Update the URL
      navigate(slides[newCurrent].destination);
    };

    // const navigateToSlide = (slideName) => {
    //   const slideIndex = slides.findIndex(slide => slide.name === slideName);
    //   console.log("slide.name, slideName", slideName)
    //   if (slideIndex >= 0) {
    //     setCurrent(slideIndex);
    //     navigate(slides[slideIndex].destination);
    //   }
    // };
  
    return (
    <div className="overflow-hidden relative top-0 left-0 w-full h-screen">
      <div
        className="flex transition ease-out duration-400"
        style={{
          width: `${100 * slides.length}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full" style={{ width: '100%' }}>
            <Slide slide={slide}/>
          </div>
        ))}
      </div> 
    </div>
    );
  }