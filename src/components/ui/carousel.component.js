import { useState, useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import AboutData from '../../aboutdb.json';
import ImageSlide from './imageSlide.component.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

register();

export default function Carousel({ slides, currentIndex }) {

  const navItems = AboutData.navItems;
  const slideImages = AboutData.images;

  const [current, setCurrent] = useState('0'); // 현재 슬라이드 인덱스
  const [direction, setDirection] = useState('next'); // 'next' 또는 'prev'
  const [prevSlideIndex, setPrevSlideIndex] = useState(null); // 이전 슬라이드 인덱스 초기화
  const prevSlideIndexRef = useRef();
  const [activeNav, setActiveNav] = useState(navItems[0].name); // 활성화된 네비게이션 아이템 - 첫 네비케이션 이름 

  useEffect(() => {
    // 초기 렌더링에서는 prevSlideIndexRef.current가 undefined
    if (prevSlideIndexRef.current !== undefined) {
      setDirection(current > prevSlideIndexRef.current ? 'next' : 'prev');
    }
    setActiveNav(navItems[current].name)

    console.log("이전슬라이드 인덱스",prevSlideIndexRef.current)
    prevSlideIndexRef.current = current;     // 현재 인덱스를 이전 인덱스로 설정
    console.log("현재슬라이드 인덱스",current)
    console.log("Direction",direction)
  }, [current,activeNav]); // current가 바뀔 때마다 실행

  const handleNavClick = (id) => {
    const clickedItemIndex = navItems.findIndex(item => item.id === id);
    if (clickedItemIndex !== -1) {
      const newDirection = clickedItemIndex > current ? 'next' : 'prev';
      setDirection(newDirection);
      prevSlideIndexRef.current = current; // 이전 인덱스 저장
      setCurrent(clickedItemIndex);
       console.log("네비 누르고 이전슬라이드 인덱스",prevSlideIndexRef.current)
       console.log("네비 누르고 지금 인덱스",current)
    }
  };

  


  // 현재 슬라이드 객체를 가져옵니다.
  const currentSlide = slides[current];
  // 이미지 슬라이드에 필요한 현재 슬라이드의 이미지 데이터를 찾습니다.

  return (
    <div className="grid md:grid-cols-2 h-screen">
      {/* Left Column for Navigation / Text */}
      <div className="md:order-1 p-8 space-y-4">
        {/* Navigation Buttons */}
        <ul className="flex flex-row p-8">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className={`cursor-pointer px-4 py-2 ${
                activeNav === item.name ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="md:w-full p-8 space-y-4">
        {/* Quote and Biography Text */}
        <blockquote className="italic">
            {currentSlide.quote}
          </blockquote>
          <p className="text-sm">
            {currentSlide.bio}
          </p>
          </div>
      </div>

      {/* Right Column for Content */}
      <div className="md:order-2 h-full relative">
      {/* <TransitionGroup>
          <CSSTransition
            key={current}
            timeout={700}
            classNames={`slide-${direction}`}
            onExit={() => setDirection(current > prevSlideIndexRef.current ? 'prev' : 'next')}
          >
        <div className="carousel">
        <div
            className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:ease-in"
            style={{ backgroundImage: `url('${currentSlide.img_url}')` }}
            aria-label={currentSlide.name}
          ></div>
        </div>
          </CSSTransition>
      </TransitionGroup> */}
      <div className="carousel">
        <ImageSlide slideId={currentSlide.id}/>
      </div>
      </div>
    </div>
  );
}