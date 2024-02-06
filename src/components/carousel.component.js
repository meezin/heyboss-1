import { useState, useEffect } from "react";
import Slide from './slide.component'

export default function Carousel({ slides }) {
    let [current, setCurrent] = useState(0);

    useEffect(() => {
      const handleScroll = (event) => {
        if (event.deltaY > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      };
  
      window.addEventListener('wheel', handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    }, [current]); // Dependencies array has 'current' to ensure we have the latest slide index
  
  
    let previousSlide = () => {
      if (current === 0) setCurrent(slides.length - 1);
      else setCurrent(current - 1);
    };
  
    let nextSlide = () => {
      if (current === slides.length - 1) setCurrent(0);
      else setCurrent(current + 1);
    };
  
    return (
    <div className="overflow-hidden relative" style={{ height: '100vh' }}>
      <div
        className="flex transition ease-out duration-400"
        style={{
          width: `${100 * slides.length}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full" style={{ width: '100%' }}>
            <Slide slide={slide} />
          </div>
        ))}
      </div> 
    </div>
    );
  }