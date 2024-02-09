import { useState, useEffect, useRef } from 'react';
import AboutData from '../../aboutdb.json';
import ImageSlide from './imageSlide.component.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export default function Carousel({slides}) {

  const navItems = AboutData.navItems;
  // const images = AboutData.slides.;
  // const images = slides.map(slide => {
  //   // Special handling for slides with subtabs
  //   if (slide.subtab && slide.subtab.length > 0) {
  //     return {
  //       subimages: slide.subtab.map(sub => ({
  //         id:sub.id,
  //         img_url: sub.img_url // Extracting only the img_url from each subtab
  //       }))
  //     };
  //   } 
  //   // Regular handling for slides without subtabs
  //   else {
  //     return {
  //       id: slide.id,
  //       img_url: slide.img_url
  //     };
  //   }
  // });

  const [current, setCurrent] = useState('0'); // 현재 슬라이드 인덱스
  //const [swiper, setSwiper] = useState<Swiper>();
  const swiperRef = useRef(null);
  const bioRef = useRef(); // bio 텍스트를 포함하는 div에 대한 ref
  const [direction, setDirection] = useState('next'); // 'next' 또는 'prev'
  const [prevSlideIndex, setPrevSlideIndex] = useState(null); // 이전 슬라이드 인덱스 초기화
  const prevSlideIndexRef = useRef();
  //const [activeNav, setActiveNav] = useState('0'); // 활성화된 네비게이션 아이템 - 첫 네비케이션 이름 

  const [activeMainNav, setActiveMainNav] = useState(navItems[0].id);
  const [activeSubNav, setActiveSubNav] = useState('');

  // 메인 nav 항목 클릭 핸들러
  const handleMainNavClick = (id) => {
    setActiveMainNav(id);
    // 메인 nav 항목 변경 시 서브 nav 초기화
    setActiveSubNav('');
    const slideIndex = slides.findIndex(image => image.id === id);
    if (slideIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(slideIndex); // Swiper 슬라이드 이동
      setCurrent(slideIndex); // 현재 슬라이드 인덱스 상태 업데이트
    }
  };

  // 서브 nav 항목 클릭 핸들러
  const handleSubNavClick = (id) => {
    setActiveSubNav(id);
    const slideIndex = slides.findIndex(image => image.id === id);
    if (slideIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(slideIndex); // Swiper 슬라이드 이동
      setCurrent(slideIndex); // 현재 슬라이드 인덱스 상태 업데이트
    }
  };

  useEffect(() => {
    //setActiveNav(navItems[current].name)
    // console.log(images)

    const handleScroll = (event) => {
      const bioElement = bioRef.current;
      const handleScroll = () => {
        // 스크롤 위치와 요소의 높이를 비교하여 하단에 도달했는지 확인
        if (bioElement.scrollHeight - bioElement.scrollTop === bioElement.clientHeight) {
          const nextIndex = (current + 1) % slides.length; // 다음 슬라이드 인덱스 계산
          setCurrent(nextIndex); // 현재 슬라이드 인덱스 상태 업데이트
          swiperRef.current.slideTo(nextIndex); // Swiper 슬라이드 이동
        }
      };
    };

    const bioElement = bioRef.current;
    bioElement.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      bioElement.removeEventListener('scroll', handleScroll);
    };

  }, [current,slides.length]); // current가 바뀔 때마다 실행

  const handleNavClick = (id) => {
    const slideIndex = slides.findIndex(image => image.id === id);
    if (slideIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(slideIndex); // Swiper 슬라이드 이동
      setCurrent(slideIndex); // 현재 슬라이드 인덱스 상태 업데이트
    }
  };

  

  


  // 현재 슬라이드 객체를 가져옵니다.
  const currentSlide = slides[current];
  // 이미지 슬라이드에 필요한 현재 슬라이드의 이미지 데이터를 찾습니다.

  return (
    <div className="grid sm:grid-cols-1  md:grid-cols-2 h-screen">
      {/* Left Column for Navigation / Text */}
      <div className="md:order-1 p-8 space-y-4">
        {/* Navigation Buttons */}
        <ul className="flex flex-row p-8">
          {/* {navItems.map((item, index) => (
            <li
            key={item.id}
            className={`navigation-item cursor-pointer px-4 py-2 ${activeNav === item.name ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
            >
            {item.name}
            </li>
          ))} */}
          {navItems.map((item) => (
          <li key={item.id} className={`navigation-item cursor-pointer px-4 py-2 ${activeMainNav === item.id ? 'active' : ''}`} onClick={() => handleMainNavClick(item.id)}>
            {item.name}
            {/* 서브 네비게이션 렌더링 */}
            {item.subtab && item.subtab.length > 0 && activeMainNav === item.id && (
              <div className="sub-nav flex flex-row p-8">
                {item.subtab.map((subItem) => (
                  <button key={subItem.id} className={` navigation-item cursor-pointer px-4 py-2 ${activeMainNav === subItem.id ? 'active' : ''}`} onClick={() => handleSubNavClick(subItem.id)}>
                    {subItem.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
        </ul>
        <div className="md:w-full p-8 space-y-4">
        {/* Quote and Biography Text */}
        <blockquote className="italic">
            {currentSlide.quote}
          </blockquote>
          <p ref={bioRef} className="text-sm overflow-auto max-h-[400px]">
            {currentSlide.bio}
          </p>
          </div>
      </div>

      {/* Right Column for Content */}
      <div className="md:order-2 h-screen relative">
      <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex)} // 현재 슬라이드 인덱스 업데이트
        direction={'vertical'}
        autoHeight={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        //slidesPerView={1}
        modules={[ Mousewheel, Pagination]}
      >
      {slides.map((slide, index) => {
        // img_url이 있을 때는 기본 이미지 슬라이드를 생성
        if (!slide.subtab) {
          return (
            <SwiperSlide key={slide.id}>  
              <div
                className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:scale-105 hover:ease-in"
                style={{ backgroundImage: `url('${slide.img_url}')` }}
              ></div>
            </SwiperSlide>
          );
        } 
        // img_url이 없고 subimages 배열이 있는 경우, 중첩된 Swiper 생성
        else if (slide.subtab && slide.subtab.length > 0) {
          return (
              <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setCurrent(swiper.activeIndex)} // 현재 슬라이드 인덱스 업데이트
                className="nestedSwiper"
                pagination={{
                  clickable: true,
                }}
                mousewheel={true}
                //slidesPerView={1}
                modules={[ Mousewheel, Pagination]}
              >
                {slide.subtab.map((subimage, subIndex) => (
                  <SwiperSlide key={`${slide.id}-${subIndex}`}>
                    <div
                      className="image bg-cover bg-no-repeat bg-center w-full h-screen"
                      style={{ backgroundImage: `url('${subimage.img_url}')` }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
          );
        } else {
          // img_url도 없고 subimages도 없는 경우의 처리
          return null;
        }
      })}
    </Swiper>
      </div>
    </div>
  );
}