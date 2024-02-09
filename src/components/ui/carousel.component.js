import { useState, useEffect, useRef } from 'react';
import AboutData from '../../aboutdb.json';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export default function Carousel({slides}) {

  const navItems = AboutData.navItems;

  const [current, setCurrent] = useState('0'); // 현재 슬라이드 인덱스
  //const [swiper, setSwiper] = useState<Swiper>();
  const swiperRef = useRef(null);
  const bioRef = useRef(); // bio 텍스트를 포함하는 div에 대한 ref
  // const [direction, setDirection] = useState('next'); // 'next' 또는 'prev'
  // const [prevSlideIndex, setPrevSlideIndex] = useState(null); // 이전 슬라이드 인덱스 초기화
  // const prevSlideIndexRef = useRef();
  // const [activeNav, setActiveNav] = useState('0'); // 활성화된 네비게이션 아이템 - 첫 네비케이션 이름 

  const [activeMainNav, setActiveMainNav] = useState(navItems[0].id);
  const [activeSubNav, setActiveSubNav] = useState('');
  const [currentContent, setCurrentContent] = useState({});


  const handleMainNavClick = (item) => {
    // 선택된 메인 nav가 SubNac가 있는지 확인
    if (item.subNav && item.subNav.length > 0) {
      // 첫번째 슬라이드 값을 subNav[0] 로 설정
      const firstSubNavItem = item.subNav[0];
      setActiveSubNav(firstSubNavItem.id); 
      updateCurrent(firstSubNavItem.id);
      setCurrentContent({ quote: firstSubNavItem.quote, bio: firstSubNavItem.bio });
    } else {
      updateCurrent(item.id);
      setActiveSubNav('') // sub nav가 없으면 초기화
      setCurrentContent({ quote: item.quote, bio: item.bio });
    }
  };

  const updateCurrent = (slideId) => {
    // Find the index of the slide or subSlide with the matching slideId
    let slideIndex = slides.findIndex(slide => slide.id === slideId || (slide.subNav && slide.subNav.some(sub => sub.id === slideId)));
  
    // Update the current slide state
    setCurrent(slideId);
  
    // Use Swiper API to navigate to the correct slide
    if (swiperRef.current && slideIndex !== -1) {
      swiperRef.current.slideTo(slideIndex);
    }
  };
  // 서브 네비게이션 아이템 클릭 핸들러
  const handleSubNavClick = (subNavItem) => {
    setActiveSubNav(subNavItem.id);
    setCurrentContent({ quote: subNavItem.quote, bio: subNavItem.bio });
    console.log(slides)
    const slideIndex = slides.findIndex(slide => slide.id === subNavItem.id);
    console.log("click===>",slideIndex)
    if (slideIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  useEffect(() => {
    setActiveMainNav(navItems[current].id)
    console.log(slides)
    console.log("클릭 현재 페이지===>", current)
    console.log("Swiper 현재 페이지===>",swiperRef.current.realIndex)
    console.log("Active main nav :", activeMainNav);
    console.log("Active main sub : ", activeSubNav);

    if (bioRef.current) {
      bioRef.current.scrollTop = 0; // 스크롤을 리셋
    }

    const handleScroll = (event) => {
      const bioElement = bioRef.current;
        // 스크롤 위치와 요소의 높이를 비교하여 하단에 도달했는지 확인
        if (bioElement.scrollHeight - bioElement.scrollTop === bioElement.clientHeight) {
          const nextIndex = (current + 1) % slides.length; // 다음 슬라이드 인덱스 계산
          setCurrent(nextIndex); // 현재 슬라이드 인덱스 상태 업데이트
          swiperRef.current.slideTo(nextIndex); // Swiper 슬라이드 이동
      };
    };

    const bioElement = bioRef.current;
    bioElement.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      bioElement.removeEventListener('scroll', handleScroll);
    };

  }, [current, activeMainNav,activeSubNav, slides.length]); // current가 바뀔 때마다 실행


  // 현재 슬라이드 객체
  const currentSlide = slides[current];

  return (
    <div className="grid sm:grid-cols-1  md:grid-cols-2 w-hull h-full">
      
      {/* Left Column for Navigation / Text */}
      <div className="relative md:order-1 p-8 space-y-4 w-full">
        {/* Navigation Buttons */}
      <div className="w-full">
      {/* 메인 네비게이션 */}
      <div className="flex md:flex-row ">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`navigation-item  cursor-pointer px-4 py-2 ${activeMainNav === item.id ? 'active' : ''}`}
            onClick={() => handleMainNavClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* 선택된 메인 네비게이션에 대한 서브 네비게이션 */}
        <div className="flex flex-row ">
          {navItems
            .find((item) => item.id === activeMainNav)
            ?.subNav?.map((subItem) => (
              <div
                key={subItem.id}
                className={`sub-navigation-item cursor-pointer px-4 py-2 ${activeSubNav === subItem.id ? 'active' : ''}`}
                
                onClick={() => handleSubNavClick(subItem)}
              >
                {subItem.name}
              </div>
            ))}
        </div>
      </div>
     
        <div className="md:w-full md:p-8 sm:p-4 space-y-4">
        {/* Quote and Biography Text */}
        <blockquote className="italic w-full overflow-hidden">
          {/* subNav 항목이 활성화되었을 때 해당하는 quote를 표시 */}
          {slides.reduce((acc, item) => {
            // 모든 slides를 순회하며 각 슬라이드의 subNav 배열에서 activeSubNav와 일치하는 항목 찾기
            const foundSubNavItem = item.subNav?.find(sub => sub.id === activeSubNav);
            if (foundSubNavItem) {
              // quote 값 acc 
              acc = foundSubNavItem.quote;
            }
            return acc; 
          }, currentSlide.quote)}
        </blockquote>
          <p ref={bioRef} className="text-sm overflow-auto max-h-[400px]">
          {slides.reduce((acc, item) => {
            const foundSubNavItem = item.subNav?.find(sub => sub.id === activeSubNav);
            if (foundSubNavItem) {
              // quote 값 acc 
              acc = foundSubNavItem.bio;
            }
            return acc; 
          }, currentSlide.bio)}
          </p>
          </div>
      </div>

      {/* Right Column for Content */}
      <div className="md:order-2 h-screen relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setCurrent(swiper.activeIndex)
            // 현재 슬라이드에 해당하는 데이터 가져오기
            const currentSlideData = slides[swiper.activeIndex];

            // 현재 슬라이드가 subNav를 포함하는지 확인
            if (currentSlideData.subNav && currentSlideData.subNav.length > 0) {
              // subNav가 있다면 subNav[0]을 초기값으로 설정
              const firstSubNavId = currentSlideData.subNav[0].id;
              setActiveSubNav(firstSubNavId); // subNav의 첫 번째 항목을 활성화
              // 필요한 경우, subNav[0]의 quote와 bio를 현재 컨텐츠로 설정
              setCurrentContent({
                quote: currentSlideData.subNav[0].quote,
                bio: currentSlideData.subNav[0].bio
              });
            } else {
              // subNav가 없는 경우, 기본 컨텐츠를 현재 슬라이드의 컨텐츠로 설정
              setActiveSubNav(''); // subNav 활성화 상태 초기화
              setCurrentContent({
                quote: currentSlideData.quote,
                bio: currentSlideData.bio
              });
            }
          }} // 현재 슬라이드 인덱스 업데이트
          className="swiper"
          direction={'vertical'}
          autoHeight={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          slidesPerView={1}
          modules={[Mousewheel, Pagination]}
        >
          {slides.map((slide) => {
            if (slide.subNav && slide.subNav.length > 0) {
              return slide.subNav.map((subNav, subNavIndex) => (
                <SwiperSlide key={`${slide.id}-${subNavIndex}`}>
                  <Swiper
                    className="swiper-h"
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    autoHeight={true}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                  >
                    {subNav.img_url.map((url, index) => (
                      <SwiperSlide key={`${subNav.id}-${index}`}>
                        <div
                          style={{ backgroundImage: `url('${url}')` }}
                          className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:scale-105 hover:ease-in"
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </SwiperSlide>
              ));
            } else {
              return (
                <SwiperSlide key={slide.id}>
                  <div
                    style={{ backgroundImage: `url('${slide.img_url}')` }}
                    className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:scale-105 hover:ease-in"
                  ></div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
}